/**
 * Есть массив объектов, которые имеют поля id и parent,
 * через которые их можно связать в дерево и некоторые произвольные поля.
 * id может быть как числом, так и строкой.
 * Порядок id не гарантируется, изначально отсутствует какой либо принцип сортировки.
 * Поле type не влияет ни на что, просто отображает возможность наличия какой-то полезной нагрузки в айтемах.
 */

export declare type Item<ID = string | number, Extra extends {} = {}> = {
  id: ID;
  parent: ID;
} & Extra;

export interface TreeStoreAPI<ID = string | number> {
  getAll(): Item<ID>[];
  getItem(id: ID): Item<ID> | undefined;
  getChildren(id: ID): Item<ID>[];
  getAllChildren(id: ID): Item<ID>[];
  getParent(id: ID): Item<ID> | undefined;
  getAllParents(id: ID): Item<ID>[];
}

export class TreeStore<ID extends string | number = string | number>
  implements TreeStoreAPI<ID>
{
  private items: Item<ID>[];
  private itemsMap: Record<ID, Item<ID>>;
  private paretToChildrenMap: Record<ID, ID[]>;
  private childrenToParentMap: Record<ID, ID>;
  constructor(_items: Item<ID>[]) {
    if (!_items || !Array.isArray(_items)) {
      throw new Error("Items must be an array.");
    }
    this.items = _items;
    this.itemsMap = _items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as Record<ID, Item<ID>>);
    this.paretToChildrenMap = _items.reduce((acc, item) => {
      if (!acc[item.parent]) {
        acc[item.parent] = [];
      }
      acc[item.parent].push(item.id);
      return acc;
    }, {} as Record<ID, ID[]>);
    this.childrenToParentMap = _items.reduce((acc, item) => {
      acc[item.id] = item.parent;
      return acc;
    }, {} as Record<ID, ID>);
  }
  getItem(id: ID): Item<ID> | undefined {
    return this.itemsMap[id];
  }
  getChildren(id: ID): Item<ID>[] {
    return (
      this.paretToChildrenMap[id].map((childId) => this.itemsMap[childId]) ||
      ([] as Item<ID>[])
    );
  }
  getAllChildren(id: ID): Item<ID>[] {
    return [
      ...(this.paretToChildrenMap[id]?.map(
        (childId) => this.itemsMap[childId]
      ) || []),
      ...(this.paretToChildrenMap[id]?.map((childId) => this.getAllChildren(childId)) || []).flat(),
    ];
  }
  getParent(id: ID): Item<ID> | undefined {
    return this.itemsMap[this.childrenToParentMap[id]];
  }
  getAllParents(id: ID): Item<ID>[] {
    const parents: Item<ID>[] = [];
    let parent = this.getParent(id);
    while (parent) {
      parents.push(parent);
      parent = this.getParent(parent.id);
    }
    return parents;
  }
  getAll(): Item<ID>[] {
    return this.items;
  }
}
