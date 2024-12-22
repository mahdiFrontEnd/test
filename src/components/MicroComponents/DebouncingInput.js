import {Input} from "antd";
import React, {useEffect, useRef} from 'react';
import Debouncing from "../../helper/Debouncing";

const DebouncingInput = ({
                             placeholder,
                             defaultValue = '',
                             onChange, delay = 1000,
                             type = 'text',
                             id = '',
                             name = '',
                             allowClear
                         }) => {
    const didMountRef = useRef(false);
    const [debounceValue, setValue, actualValue] = Debouncing(defaultValue, delay)

    useEffect(() => {
        if (didMountRef.current) {

            onChange(debounceValue)

        } else {
            didMountRef.current = true;
        }


    }, [debounceValue])
    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return (<Input allowClear={allowClear}
                   placeholder={placeholder}
                   id={id}
                   name={name}
                   type={type}
                   onChange={(e) => {
                       setValue(e.target.value);
                   }}
                   value={actualValue}
                   defaultValue={actualValue}
        />


    );
};

export default DebouncingInput;