import React, {useEffect, useRef} from 'react';
import CurrencyInputComponent from "./CurrencyInputComponent";
import Debouncing from "../../helper/Debouncing";

const DebouncingCurrencyInput = ({placeholder, defaultValue, onChange}) => {
    const didMountRef = useRef(false);
    const [debounceValue, setValue,actualValue] = Debouncing('', 1000)


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
    return (

        <CurrencyInputComponent
            onChange={(e) => {
                setValue(e)
            }}
            value={actualValue}
            defaultValue={defaultValue} placeholder={placeholder}/>

    );
};

export default DebouncingCurrencyInput;