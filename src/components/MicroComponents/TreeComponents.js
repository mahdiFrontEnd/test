import React, {useEffect, useState} from 'react';
import {Tree} from "antd";

const TreeComponents = ({
                            onChange, valueArray, treeData, fieldNames = {label: 'show_title'}
                        }) => {

    const [checkedKeys, setCheckedKeys] = useState([]);

    useEffect(() => {
        setCheckedKeys(valueArray)
    }, [valueArray])
    return (<Tree
        checkable
        onCheck={(e, x) => {
            if (Array.isArray(x.node.children) && x.checked) {
                const childrenValueArray = x.node.children?.map((item) => {
                    return item.value
                })
                // eslint-disable-next-line no-shadow
                const result = e.filter(x => !childrenValueArray.includes(x))
                onChange(result)
            } else {
                onChange(e)
            }


        }}
        fieldNames={fieldNames}
        checkedKeys={checkedKeys}
        treeData={treeData}
        autoExpandParent
    />);
};

export default TreeComponents;