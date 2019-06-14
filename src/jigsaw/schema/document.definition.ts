import { SchemaElement, SubstitutionGroup } from './element.definition';
import { SchemaElementRef } from './element-ref.definition';
import { SchemaAttribute } from './attribute.definition';
import { SchemaAttributeRef } from './attribute-ref.definition';
import { SchemaComplexType } from './complexType.definition';

export class SchemaDocument {
  public elementDefinitions: Array<SchemaElement | SchemaElementRef> = [];
  public attributeDefinitions: Array<SchemaAttribute | SchemaAttributeRef> = [];
  public complexTypes: SchemaComplexType[] = [];

  public addElement(child: SchemaElement | SchemaElementRef) {
    this.elementDefinitions = [...this.elementDefinitions, child];
  }

  public addAttribute(child: SchemaAttribute | SchemaAttributeRef) {
    this.attributeDefinitions = [...this.attributeDefinitions, child];
  }

  public addComplexType(child: SchemaComplexType) {
    this.complexTypes = [...this.complexTypes, child];
  }

  public getElementDefinitions(): SchemaElement[] {
    return this.elementDefinitions.filter((el) => el.name);
  }

  public getAbstractElements(): SchemaElement[] {
    const abstracts = this.elementDefinitions.filter((el) => el.abstract);
    this.elementDefinitions = this.elementDefinitions.filter(
      (el) => !el.abstract,
    );
    return abstracts;
  }

  public getSubstitutionElements(): SchemaElement[] {
    return this.elementDefinitions.filter((el) => el.substitutionGroup);
  }

  public resolveComplexTypes() {
    const groups = this.parseSubstitutionGroups();
    this.complexTypes.map((type: SchemaComplexType) => {
      type.elementDefinitions = type.elementDefinitions.reduce(
        (acc: Array<SchemaElement | SchemaElementRef>, el) => {
          let updates: SchemaElement[] = [];
          let group: SubstitutionGroup | undefined;

          if (el.isRef) {
            const ref = (el as SchemaElementRef).ref;
            const refEl = this.elementDefinitions.find(
              (def) => def.name === ref,
            );
            group = groups.find((g) => g.name === ref);

            if (group) {
              updates = group.elements;
            } else if (refEl) {
              updates = [refEl];
            }
          }

          return [...acc, ...updates];
        },
        [],
      );
    });
  }

  public updateTypes() {
    this.elementDefinitions.map((el: SchemaElement) => {
      const type = el.type;
      const complexType = this.complexTypes.find((t) => t.name === type);

      if (complexType) {
        el.elementDefinitions = complexType.elementDefinitions;
        el.mixed = complexType.mixed;
      } else {
        el.elementDefinitions = el.elementDefinitions.map((childEl) => {
          let update = childEl;
          if (childEl.isRef) {
            const ref = (childEl as SchemaElementRef).ref;

            update = this.elementDefinitions.find(
              (def) => def.name === ref,
            ) as SchemaElement;
          }

          return update;
        });
      }
    });
  }

  public getDefinition(name: string): SchemaElement {
    const def = this.getElementDefinitions().find(
      (d: SchemaElement) => d.name === name,
    );

    if (!def) {
      throw new Error(`Unable to find schema definition for '${name}'`);
    }

    return def;
  }

  public isContentEditable(name: string): boolean {
    const def = this.getDefinition(name);

    if (def) {
      return def.mixed || def.type === 'xs:string';
    }

    return false;
  }

  private parseSubstitutionGroups(): SubstitutionGroup[] {
    const abstracts = this.getAbstractElements();
    const substitutions = this.getSubstitutionElements();

    return abstracts.map(
      (abs: SchemaElement): SubstitutionGroup => {
        return {
          name: abs.name,
          elements: substitutions.filter((sub: SchemaElement) =>
            sub.substitutes(abs.name),
          ),
        };
      },
    );
  }
}
