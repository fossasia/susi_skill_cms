/// <reference types="react" />
import React from 'react';
export interface FilterMenuProps {
    locale: any;
    selectedKeys: string[];
    column: {
        filterMultiple?: boolean;
        filterDropdown?: React.ReactNode;
        filters?: {
            text: string;
            value: string;
            children?: any[];
        }[];
        filterDropdownVisible?: boolean;
        onFilterDropdownVisibleChange?: (visible: boolean) => any;
        fixed?: boolean | string;
        filterIcon?: React.ReactNode;
    };
    confirmFilter: (column: Object, selectedKeys: string[]) => any;
    prefixCls: string;
    dropdownPrefixCls: string;
    getPopupContainer: (triggerNode?: Element) => HTMLElement;
}
export default class FilterMenu extends React.Component<FilterMenuProps, any> {
    static defaultProps: {
        handleFilter(): void;
        column: {};
    };
    neverShown: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    setSelectedKeys: ({selectedKeys}: {
        selectedKeys: any;
    }) => void;
    setVisible(visible: any): void;
    handleClearFilters: () => void;
    handleConfirm: () => void;
    onVisibleChange: (visible: any) => void;
    confirmFilter(): void;
    renderMenuItem(item: any): JSX.Element;
    hasSubMenu(): boolean;
    renderMenus(items: any): any;
    handleMenuItemClick: (info: any) => void;
    renderFilterIcon: () => JSX.Element;
    render(): JSX.Element;
}
