import { describe, expect, test } from "@jest/globals";
import { TreeStore, Item } from ".";

const items: Item<string | number, { type?: string | null }>[] = [
  { id: 1, parent: "root" }, // 0
  { id: 2, parent: 1, type: "test" }, // 1
  { id: 3, parent: 1, type: "test" }, // 2

  { id: 4, parent: 2, type: "test" }, // 3
  { id: 5, parent: 2, type: "test" }, // 4
  { id: 6, parent: 2, type: "test" }, // 5

  { id: 7, parent: 4, type: null }, // 6
  { id: 8, parent: 4, type: null }, // 7
];

describe("TreeStore", () => {
  test("should be defined", () => {
    expect(TreeStore).toBeDefined();
  });

  test("should be an instance of TreeStore", () => {
    expect(new TreeStore([])).toBeInstanceOf(TreeStore);
  });

  test("should return all items", () => {
    const store = new TreeStore(items);
    expect(store.getAll()).toEqual(items);
  });

  test("should return item by id", () => {
    const store = new TreeStore(items);
    expect(store.getItem(1)).toEqual(items[0]);
    expect(store.getItem(2)).toEqual(items[1]);
    expect(store.getItem(3)).toEqual(items[2]);
    expect(store.getItem(4)).toEqual(items[3]);
    expect(store.getItem(5)).toEqual(items[4]);
    expect(store.getItem(6)).toEqual(items[5]);
    expect(store.getItem(7)).toEqual(items[6]);
    expect(store.getItem(8)).toEqual(items[7]);
  });

  test("should return children by id", () => {
    const store = new TreeStore(items);
    expect(store.getChildren(1)).toEqual([items[1], items[2]]);
    expect(store.getChildren(2)).toEqual([items[3], items[4], items[5]]);
    expect(store.getChildren(4)).toEqual([items[6], items[7]]);
  });

  test("should return all children by id", () => {
    const store = new TreeStore(items);
    expect(store.getAllChildren(1)).toEqual([
        items[1], items[2], items[3], items[4], items[5], items[6], items[7],
    ]);
    expect(store.getAllChildren(2)).toEqual([
        items[3], items[4], items[5], items[6], items[7],
    ]);
    expect(store.getAllChildren(4)).toEqual([items[6], items[7]]);

    expect(store.getAllChildren(7)).toEqual([]);
  });

  test("should return parent by id", () => {
    const store = new TreeStore(items);
    expect(store.getParent(1)).toEqual(undefined);
    expect(store.getParent(2)).toEqual(items[0]);
    expect(store.getParent(3)).toEqual(items[0]);
    expect(store.getParent(4)).toEqual(items[1]);
    expect(store.getParent(5)).toEqual(items[1]);
    expect(store.getParent(6)).toEqual(items[1]);
    expect(store.getParent(7)).toEqual(items[3]);
    expect(store.getParent(8)).toEqual(items[3]);
  });

  test("should return all parents by id", () => {
    const store = new TreeStore(items);
    expect(store.getAllParents(1)).toEqual([]);
    expect(store.getAllParents(2)).toEqual([items[0]]);
    expect(store.getAllParents(3)).toEqual([items[0]]);
    expect(store.getAllParents(4)).toEqual([items[1], items[0]]);
    expect(store.getAllParents(5)).toEqual([items[1], items[0]]);
    expect(store.getAllParents(6)).toEqual([items[1], items[0]]);
    expect(store.getAllParents(7)).toEqual([items[3], items[1], items[0]]);
    expect(store.getAllParents(8)).toEqual([items[3], items[1], items[0]]);
  });
});
