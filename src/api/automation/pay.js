import {toast} from "react-toastify";
import Automation from "../http_request/Model/automation/Automation";

export const payApi = (dataId, data, setErrorText,setIsAddLoading, success) => {



    Automation.request({
        success: (response) => {

            success(response);
        },
        error: (res) => {
            toast.warning(res.message);
            setErrorText(res.errors);


        },
        final: ( ) => {
            setIsAddLoading(false)


        }
    }).payAutomationPayment(dataId, data)


};
