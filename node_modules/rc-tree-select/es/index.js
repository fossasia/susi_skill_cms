// export this package's api
import TreeSelect from './Select';
import TreeNode from './TreeNode';

TreeSelect.TreeNode = TreeNode;

export default TreeSelect;
export { TreeNode };
export { SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './strategies';