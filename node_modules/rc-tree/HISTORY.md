# History
---

## 1.4.0 / 2016-10-24
- add `onDragEnd` API and fix related issues.

## 1.3.0 / 2016-04-15
- make `autoExpandParent` also work in controlled mode.(Before just work in uncontrolled mode)
- change `onExpand` params
    - old: function(node, expanded, expandedKeys)
    - new: function(expandedKeys, {expanded: bool, node})

## 1.2.1 / 2016-04-08
- remove `halfCheckedKeys` api, and change `checkedKeys` to an object on setting `checkStrictly`.

## 1.2.0 / 2016-04-06
- improve performance.
- add `checkStrictly`/`halfCheckedKeys` api.

## 1.1.0 / 2016-01-25
- change `onDrop` params (from `originExpandedKeys` to `rawExpandedKeys`)

## 1.0.x / 2016-01-15
- change `onSelect`/`onCheck` params

## 0.26.x / 2016-01-13
- change drag api (from `onTreeXX` to `onXX`)

## 0.23.x / 2015-12-31
- change `onDataLoaded` api to `loadData`

## 0.22.x / 2015-12-30
- add `expandedKeys`/`onExpand`/`filterTreeNode` api

## 0.21.x / 2015-12-25
- add `onMouseEnter`/`onMouseLeave` api

## 0.20.0 / 2015-12-01
- add draggable feature #5

## 0.18.0 / 2015-10-23
- add contextmenu feature #5

## 0.17.0 / 2015-10-14
- add dynamic feature #4

## 0.9.5 / 2015-05-26
- support checkbox
