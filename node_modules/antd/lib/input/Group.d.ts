/// <reference types="react" />
import React from 'react';
export interface GroupProps {
    className?: string;
    size?: 'large' | 'small' | 'default';
    children?: any;
    style?: React.CSSProperties;
    prefixCls?: string;
    compact?: boolean;
}
declare const Group: React.StatelessComponent<GroupProps>;
export default Group;
