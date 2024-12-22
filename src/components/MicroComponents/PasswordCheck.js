import React from 'react';
import ReactPasswordChecklist from "react-password-checklist";

const PasswordCheck = ({setDisabled, password, password2}) => {
    return (<div className="PasswordCheck"><ReactPasswordChecklist onChange={(isValid) => {
            setDisabled(!isValid)

        }}
                                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                                    minLength={8}
                                    value={password}
                                    valueAgain={password2}
                                    messages={{
                                        minLength: "رمز حداقل هشت کارکتر دارد.",
                                        specialChar: "رمز دارای کاراکترهای خاص است.",
                                        number: "رمز حداقل یک عدد دارد.",
                                        capital: "رمز عبور دارای حروف بزرگ است.",
                                        match: "گذر واژه ها همخوانی دارند",
                                    }}
        /></div>);
};

export default PasswordCheck;