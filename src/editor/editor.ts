import { HTTPService } from './services/http.service';
import { SchemaParser } from './schema/schema.parser';
import { SchemaDocument } from './schema/document.definition';
import { XMLEnricher } from './document/enricher';
import { VNodeRenderer } from './renderer/vnode-renderer';
import { EventEmitter } from './core/event-emitter';
import { CreateElement } from 'vue';
import { ComplexDocument } from './document/complex-document';
import { ComplexNode } from './document/complex-node';
import { NodeType } from './document/document.info';
import { ComplexText } from './document/complex-text';
import {
  ComplexAttribute,
  ComplexAttributeType,
} from './document/complex-attribute';

export class Editor extends EventEmitter {
  public xml: Document | null = null;
  public document: ComplexDocument = new ComplexDocument(
    new ComplexNode('', '', null),
  );
  public enrichedXSL: Document | null = null;
  public xhtml: Document | null = null;
  public schema: SchemaDocument = new SchemaDocument();
  public renderer: VNodeRenderer | null = null;

  private http: HTTPService = new HTTPService();
  private enricher: XMLEnricher = new XMLEnricher();

  constructor(file: string, stylesheet: string, schema: string) {
    super();
    this.load(file, stylesheet, schema);
  }

  public getXHTML(): Document {
    if (this.enrichedXSL && this.xml) {
      const p = new XSLTProcessor();
      p.importStylesheet(this.enrichedXSL);
      return p.transformToDocument(this.xml);
    } else {
      throw new Error('Error transforming XHTML');
    }
  }

  public getRenderer(h: CreateElement): VNodeRenderer {
    if (this.xml && this.schema) {
      return new VNodeRenderer(h, this.xml, this.schema);
    } else {
      throw new Error('Jigsaw Renderer unabled to initialize');
    }
  }

  public handleDomEvent(evt: KeyboardEvent) {
    const el = evt.target;
    const id = (el as Element).getAttribute('data-editor-node-id');

    if (id) {
      // find complex node
      const node = this.document.getComplexNode(id);
      // find node in XML
      this.emit('changedFocus', node);

      // trigger
      // debugger;
    }

    evt.preventDefault();
    evt.stopPropagation();
  }

  private async load(file: string, stylesheet: string, schema: string) {
    const xml = await this.http.getDocument(file);
    const xsl = await this.http.getDocument(stylesheet);
    const xsd = await this.http.getDocument(schema);

    // parse the schema
    const parser = new SchemaParser(xsd);
    this.schema = parser.schema;

    // enrich the xml with uuids
    this.xml = this.enricher.getEnrichedXML(xml);

    // create a complex document representation of the xml
    this.document = this.parseComplexDocument(this.xml);

    // enrich the xsl to output uuids
    this.enrichedXSL = await this.enrichStylesheet(xsl);
    if (!this.enrichedXSL) {
      throw new Error('Error enriching XSL');
    }

    this.emit('initialized', this.xml);
  }

  private parseComplexDocument(xml: Document): ComplexDocument {
    const doc = new ComplexDocument(this.parseComplexNode(xml.documentElement));

    return doc;
  }

  private parseComplexNode(
    node: Element,
    parent: ComplexNode | null = null,
  ): ComplexNode {
    const name = node.nodeName;
    const uuid = node.getAttribute('editor:node-id');
    const definition = this.schema.getDefinition(name);

    if (!uuid) {
      throw new Error('Unable to parse complex node, uuid not found');
    }

    const complexNode = new ComplexNode(uuid, name, parent);
    const childNodes = [...node.childNodes]
      .filter(
        (child: ChildNode) =>
          child.nodeType !== NodeType.PROCESSING_INSTRUCTION,
      )
      .map((child: ChildNode, index: number) => {
        switch (child.nodeType) {
          case NodeType.TEXT:
            const textNode = new ComplexText(child.textContent, complexNode);
            textNode.index = index;
            return textNode;
          default:
            const childNode = this.parseComplexNode(
              child as Element,
              complexNode,
            );
            childNode.index = index;
            return childNode;
        }
      });

    complexNode.setChildNodes(childNodes);

    complexNode.setAttributes(
      [...node.attributes]
        .filter((attr: Attr) => attr.name !== 'editor:node-id')
        .map(
          (attr: Attr) =>
            new ComplexAttribute(attr.name, ComplexAttributeType.String),
        ),
    );

    complexNode.mixed = definition.mixed;
    complexNode.min = definition.minOccurs;
    complexNode.max = definition.maxOccurs;

    return complexNode;
  }

  private async enrichStylesheet(xsl: Document): Promise<Document> {
    const exsl = await this.http.getDocument('/editor-xsl-transform.xsl');
    const p = new XSLTProcessor();
    p.importStylesheet(exsl);
    return p.transformToDocument(xsl);
  }
}
