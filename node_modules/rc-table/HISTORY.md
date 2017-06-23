# History
----

## 5.3.0 / 2017-04-06

- `emptyText` support React.Node

## 5.0.0 / 2016-09-07

- Remove props `columnsPageSize` and `columnsPageRange`, use fixed columns instead.
- Add prop `onRowDoubleClick`.
- Improve perfermance when expand row.

## 4.6.0 / 2016-08-29

Add prop `emptyText`.

## 4.5.3 / 2016-08-24

[#76](https://github.com/react-component/table/pull/76)

## 4.5.2 / 2016-08-23

Add `indent` as third argument to `rowClassName` `rowRef` `expandRowClassName`。

## 4.5.1 / 2016-08-19

Add original event param for `onRowClick`

## 4.5.0 / 2016-08-17

Add `expandRowByClicky` prop, allow expanding the row by clicking it.

## 4.4.7 / 2016-08-16

Fix https://github.com/ant-design/ant-design/issues/2729

## 4.4.6 / 2016-08-05

Fix https://github.com/ant-design/ant-design/issues/2625

## 4.4.2 / 2016-08-01

- Improve row and cell render perfermance.

## 4.4.1 / 2016-07-24

-  Fix row expand of key 0 record. (ant-design/ant-design#2471)

## 4.4.0 / 2016-07-19

- Add `title` prop [demo](http://react-component.github.io/table/examples/title-and-footer.html)
- Add `getBodyWrapper` prop [demo](http://react-component.github.io/table/examples/animation.html)
- Use `maxHeight` for fixed-header Table [#65](https://github.com/react-component/table/issues/65)

## 4.3.0 / 2016-06-20

- support `rowKey="uid"`

## 4.2.0 / 2016-06-16

- Header can be scroll in fixed-columns Table

## 4.1.0 / 2016-06-01

- Support nested string of `dataIndex`
- Fix fixed Table with expand row

## 4.0.0 / 2016-04-18

- Support fixed columns
- Add `scroll` prop
- Add `defaultExpandAllRows` prop
- Add `onExpand` prop
- Add `rowRef` prop

## 3.11.0 / 2016-02-25

- Add prop `showHeader`
- support render footer via `footer={() => <div>xxx</div>}`

## 3.10.0 / 2016-02-22

- Add prop expandIconColumnIndex

## 3.9.0 / 2016-01-19

- support pinned and paging columns.

## 3.8.0

- Add `onRowClick`

## 3.7.0

- Add `childenIndent`

## 3.6.0 / 2015-11-11

- add defaultExpandedRowKeys/expandedRowKeys/onExpandedRowsChange prop

## 3.5.0 / 2015-11-03

- Add colSpan and rowSpan support

## 3.3.0 / 2015-10-27

- support react 0.14

## 3.2.0 / 2015-09-09

- add expandIconAsCell prop
