## Test tree task
Run tests with `yarn test`

Tests result:
```
$ jest --verbose ./src
 PASS  src/index.test.ts
  TreeStore
    ✓ should be defined (2 ms)
    ✓ should be an instance of TreeStore (1 ms)
    ✓ should return all items
    ✓ should return item by id
    ✓ should return children by id
    ✓ should return all children by id
    ✓ should return parent by id (1 ms)
    ✓ should return all parents by id

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.636 s, estimated 1 s
Ran all test suites matching /.\/src/i.
✨  Done in 0.97s.
```

## ЗАДАНИЕ

 Есть массив объектов, которые имеют поля id и parent, через которые их можно связать в дерево и некоторые произвольные поля. id может быть как числом, так и строкой. Порядок id не гарантируется, изначально отсутствует какой либо принцип сортировки. Поле type не влияет ни на что, просто отображает возможность наличия какой-то полезной нагрузки в айтемах. 
 
