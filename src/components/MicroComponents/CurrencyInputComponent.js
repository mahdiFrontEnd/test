import React from 'react';
import CurrencyInput from "react-currency-input-field";
import {convertPersianNumberToEng} from "../../helper/convertPersianNumberToEng";

const CurrencyInputComponent = ({key='',
                                    onChange,
                                    defaultValue,
                                    placeholder,value,
                                    suffix = "  ریال ",
                                    className = 'form-control',
                                    id = "price",
                                    name = "price"
                                }) => {

    return (
        <CurrencyInput transformRawValue={(e) => convertPersianNumberToEng(e)} placeholder={placeholder}
                       id={id} className={className} key={key}
                       name={name} defaultValue={defaultValue}
                       decimalsLimit={3}
                       onValueChange={onChange}
                       value={value}
                       suffix={suffix}
        />
    );
};

export default CurrencyInputComponent;