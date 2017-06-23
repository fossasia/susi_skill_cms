# rc-tree
---

tree ui component for react

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-tree.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tree
[travis-image]: https://img.shields.io/travis/react-component/tree.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/tree
[coveralls-image]: https://img.shields.io/coveralls/react-component/tree.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/tree?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/tree.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/tree
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-tree.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-tree

## Screenshots

<img src="https://t.alipayobjects.com/images/T15BpfXn8nXXXXXXXX.png" width="288"/>


## Feature

* Support all popular browsers, including Internet Explorer 9 and above.


## Example

http://localhost:8018/examples/

online example: http://react-component.github.io/tree/examples/


## install

[![rc-tree](https://nodei.co/npm/rc-tree.png)](https://npmjs.org/package/rc-tree)

## Usage

see examples

## API

### Tree props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|className | additional css class of root dom node | String | '' |
|prefixCls | prefix class | String | '' |
|showLine | whether show line | bool | false |
|showIcon | whether show icon | bool | true |
|selectable | whether can be selected | bool | true |
|multiple | whether multiple select | bool | false |
|checkable | whether support checked | bool/React Node | false |
|defaultExpandAll | expand all treeNodes | bool | false |
|defaultExpandedKeys | expand specific treeNodes | String[] | - |
|expandedKeys | Controlled expand specific treeNodes | String[] | - |
|autoExpandParent | whether auto expand parent treeNodes | bool | true |
|defaultCheckedKeys | default checked treeNodes | String[] | [] |
|checkedKeys | Controlled checked treeNodes(After setting, defaultCheckedKeys will not work). Note: parent and children nodes are associated, if the parent node's key exists, it all children node will be checked, and vice versa. When set checkable and checkStrictly, it should be an object, which contains checked array and halfChecked array. | String[]/{checked:Array<String>,halfChecked:Array<String>} | [] |
|checkStrictly| check node precisely, parent and children nodes are not associated| bool | false |
|defaultSelectedKeys | default selected treeNodes | String[] | [] |
|selectedKeys | Controlled selected treeNodes(After setting, defaultSelectedKeys will not work) | String[] | [] |
|onExpand | fire on treeNode expand or not | function(expandedKeys, {expanded: bool, node}) | - |
|onCheck | click the treeNode/checkbox to fire | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | - |
|onSelect | click the treeNode to fire | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |
|filterTreeNode | filter some treeNodes as you need. it should return true | function(node) | - |
|loadData | load data asynchronously and the return value should be a promise | function(node) | - |
|onRightClick | select current treeNode and show customized contextmenu | function({event,node}) | - |
|onMouseEnter | call when mouse enter a treeNode | function({event,node}) | - |
|onMouseLeave | call when mouse leave a treeNode | function({event,node}) | - |
|draggable | whether can drag treeNode. (drag events are not supported in Internet Explorer 8 and earlier versions or Safari 5.1 and earlier versions.) | bool | false |
|onDragStart | it execs when fire the tree's dragstart event | function({event,node}) | - |
|onDragEnter | it execs when fire the tree's dragenter event | function({event,node,expandedKeys}) | - |
|onDragOver | it execs when fire the tree's dragover event | function({event,node}) | - |
|onDragLeave | it execs when fire the tree's dragleave event | function({event,node}) | - |
|onDrop | it execs when fire the tree's drop event | function({event, node, dragNode, dragNodesKeys}) | - |
|onDragEnd | it execs when fire the tree's dragend event | function({event,node}) | - |

### TreeNode props
> note: if you have a lot of TreeNode, like more than 1000,   
> make the parent node is collapsed by default, will obvious effect, very fast.  
> Because the children hide TreeNode will not insert into dom.

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|className | additional class to treeNode | String | '' |
|disabled | whether disabled the treeNode | bool | false |
|disableCheckbox | whether disable the treeNode' checkbox | bool | false |
|title | tree/subTree's title | String/element | '---' |
|key | it's used with tree props's (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. you'd better to set it, and it must be unique in the tree's all treeNodes | String | treeNode's position |
|isLeaf | whether it's leaf node | bool | false |

## note

The number of treeNodes can be very large, but when enable `checkable`, 
it will spend more computing time, so we cached some calculations(e.g. `this.treeNodesStates`), 
to avoid double computing. But, this bring some restrictions, 
**when you async load treeNodes, you should render tree like this** 
`{this.state.treeData.length ? <Tree ...>{this.state.treeData.map(t => <TreeNode ... />)}</Tree> : 'loading tree'}`


## Development

```
npm install
npm start
```

## Test Case

http://localhost:8018/tests/runner.html?coverage

## Coverage

http://localhost:8018/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8018/tests/runner.html?coverage

## License
rc-tree is released under the MIT license.

## other tree view
- [ztree](http://www.ztree.me/)
- [jqTree](http://mbraak.github.io/jqTree/)
- [jquery.treeselect](http://travistidwell.com/jquery.treeselect.js/)
- [angular Select Tree](http://a5hik.github.io/angular-multi-select-tree/)
