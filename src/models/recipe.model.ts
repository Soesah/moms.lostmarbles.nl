export interface RecipeData {
  id: number;
  category_id: number;
  language: string;
  slug: string;
  name: string;
  servings: string;
  preparation_time: string;
  ingredients: any[];
  xml: string;
  creation_date: string;
  modification_date: string;
}

export class Recipe {
  public id: number;
  public category_id: number;
  public language: string;
  public slug: string;
  public name: string;
  public servings: string;
  public preparation_time: string;
  public ingredients: any[];
  public xml: string;
  public creation_date: string;
  public modification_date: string;

  constructor(data: RecipeData) {
    this.id = data.id;
    this.category_id = data.category_id;
    this.language = data.language;
    this.slug = data.slug;
    this.name = data.name;
    this.servings = data.servings;
    this.preparation_time = data.preparation_time;
    this.ingredients = data.ingredients;
    this.xml = data.xml;
    this.creation_date = data.creation_date;
    this.modification_date = data.modification_date;
  }

  get cook(): string {
    const node = this.getElementsByXpath('recipe/cook')[0];
    return node && node.textContent ? node.textContent : '';
  }

  get doc(): Document {
    const parser = new DOMParser();
    return parser.parseFromString(`<recipe>${this.xml}</recipe>`, 'text/xml');
  }

  private getElementsByXpath(xpath: string): Node[] {
    const result = this.doc.evaluate(
      xpath,
      this.doc,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null,
    );
    console.log(xpath);

    let item = result.snapshotItem(0);
    let items: Node[] = [item];

    while (items.length < result.snapshotLength) {
      item = result.snapshotItem(items.length);
      items = [...items, item];
    }

    items = items.filter((node) => node);

    if (items.length === 0) {
      throw new Error(`Node not found '${xpath}'`);
    }

    return items;
  }
}
