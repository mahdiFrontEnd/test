import React from 'react';
import {useDispatch} from "react-redux";
import { IoFilterOutline } from 'react-icons/io5';
import IconBtn from "./IconBtn";
import {showSearchBoxHandler} from "../../../store/commerce/purchase/PurchaseTableRedux";

const ShowSearchBtn = () => {
    const dispatch = useDispatch();

    return (
        <IconBtn btnClass='greenIconBtn' icon={<IoFilterOutline size={22}/> }
                 onClick={() => dispatch(showSearchBoxHandler())}/>
    );
};

export default ShowSearchBtn;