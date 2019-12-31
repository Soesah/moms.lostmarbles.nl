export interface NodeConfig {
  node: string;
  name: string;
}

export class NodeConfiguration {
  private config: NodeConfig[];

  constructor(config: NodeConfig[]) {
    this.config = config;
  }

  public getNodePrettyName(node: string): string {
    const c = this.config.find((con) => con.node === node);

    if (c) {
      return c.name;
    }

    return node;
  }

}
