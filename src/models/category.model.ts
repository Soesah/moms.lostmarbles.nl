export interface CategoryData {
  id: number;
  name_singular: string;
  name_plural: string;
  slug: string;
  position: number;
}

export class Category {
  public id: number;
  public name_singular: string;
  public name_plural: string;
  public slug: string;
  public position: number;

  constructor(data: CategoryData) {
    this.id = data.id;
    this.name_singular = data.name_singular;
    this.name_plural = data.name_plural;
    this.slug = data.slug;
    this.position = data.position;
  }
}
