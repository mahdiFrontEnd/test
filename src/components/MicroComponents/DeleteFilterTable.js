import React from 'react';
import {Tooltip} from "antd";
import {useSelector} from "react-redux";
import { BiRefresh } from 'react-icons/bi';
import IconBtn from "./button/IconBtn";
import UseSetParams from '../../helper/UseSetParams';

const DeleteFilterTable = ({onClick}) => {
    const [, handleDeleteParams] = UseSetParams();
    const filter = useSelector((state) => state.TableRedux.filter);

    return (< >
        {filter !== {} && <Tooltip
            title="حذف فیلترها">


            <IconBtn btnClass='grayIconBtn' icon={<BiRefresh size={22} color="gray" />}
                     onClick={()=> {
                         // eslint-disable-next-line no-unused-expressions
                          onClick ? onClick({}) : handleDeleteParams()
                     }}/>


        </Tooltip>

        }
    </>);
};

export default DeleteFilterTable;