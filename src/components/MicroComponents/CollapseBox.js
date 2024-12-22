import React from 'react';
import {Collapse} from "antd";

const CollapseBox = ({items = [], activeKey = [],    bordered = false}) => {
    return (
        <Collapse bordered={bordered} activeKey={activeKey} items={items} />
    );
};

export default CollapseBox;