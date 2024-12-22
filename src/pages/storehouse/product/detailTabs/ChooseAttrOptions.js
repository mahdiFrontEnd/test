import React, { useEffect, useState } from 'react';
import { Button, Cascader, Form, Select, Tooltip } from 'antd';
import { toast } from 'react-toastify';
import { LuPlus } from 'react-icons/lu';
import { IoTrashOutline } from 'react-icons/io5';
import GetAttributeList from '../../../../api/http_request/Model/products/GetAttributeList';
import IconBtn from '../../../../components/MicroComponents/button/IconBtn';

const ChooseAttrOptions = ({ categoryId, setAttrOptions, data }) => {
  const [form] = Form.useForm();
  const [selectedAttrRow, setSelectedAttrRow] = useState([]);
  const [selectedOptionList, setSelectedOptionList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [resultArray, setResultArray] = useState([]);
  const [resultArrayFinal, setResultArrayFinal] = useState([]);
  const [firstAttributeList, setFirstAttributeList] = useState([]);
  const [attributeLoading, setAttributeLoading] = useState(false);
  const [attributeList, setAttributeList] = useState([]);

  useEffect(() => {
    if (data?.attribute_options) {
      const arr = [];
      // eslint-disable-next-line array-callback-return
      data.attribute_options.map((item) => {
        let beforeItem = -1;
        beforeItem = arr.findIndex((x) => x.id === item.attribute_id);
        if (beforeItem < 0) {
          arr.push({
            id: item.attribute_id,
            full_name: item.attribute_name,
            type: item.attribute_type,
            childs: [],
            options: item.option && [item.option],
          });
        } else if (item.option) {
          arr[beforeItem].options.push(item.option);
        }
      });
      setResultArray(arr);

      let newArray = [];
      // eslint-disable-next-line array-callback-return
      arr.map((item) => {
        let optionsList = null;

        if (item.options?.length) {
          optionsList = [];
          item.options.map((f) => optionsList.push(f.id));
        }
        newArray = [...newArray, { attribute_id: item.id, options: optionsList }];
      });

      setResultArrayFinal(newArray);
    }
  }, [data]);

  useEffect(() => {
    setAttributeList(firstAttributeList);
  }, [firstAttributeList]);

  useEffect(() => {
    setSelectedCategory(categoryId);
  }, [categoryId]);
  useEffect(() => {
    if (selectedCategory) {
      GetAttributeList(setFirstAttributeList, setAttributeLoading, {
        type: 'product',
        category_id: selectedCategory,
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    const finderTarget = (target, array) => {
      // setOptionList([])
      const findTarget = array.find((item) => item.id === selectedAttrRow.id);
      if (findTarget?.childs?.length) {
        finderTarget(selectedAttrRow, findTarget.childs);
      } else if (findTarget?.type === 'array') {
        findTarget.options = findTarget.options.filter((c) => !selectedOptionList.includes(c.id));
      }
    };
    finderTarget(selectedAttrRow, attributeList);
  }, [resultArray]);

  const onFinish = () => {
    if (selectedAttrRow) {
      const beforeAttr = resultArray.findIndex((item) => item.id === selectedAttrRow.id);
      if (beforeAttr < 0) {
        const selectedAttr = JSON.parse(JSON.stringify(selectedAttrRow));
        setResultArray([...resultArray, selectedAttr]);
        handleSetResultArrayFinal([...resultArrayFinal, { attribute_id: selectedAttr.id }]);
        form.resetFields();
      } else {
        toast.warning('این مورد قبلا اضافه شده است.');
      }
    }
  };
  const handleSetResultArrayFinal = (x) => {
    setResultArrayFinal(x);
  };

  useEffect(() => {
    setAttrOptions(resultArrayFinal);
  }, [resultArrayFinal]);

  return (
    <div className="d-flex flex-column " style={{ width: 'fit-content' }}>
      <Form
        name="basic"
        disabled={!selectedCategory}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="  d-flex gap-2 align-items-start">
          <div className="flex-1">
            <Form.Item
              label="ویژگی محصول"
              name="attribute_ids"
              validateStatus={!selectedCategory || !resultArrayFinal.length ? 'error' : 'success'}
              help={
                !selectedCategory
                  ? 'ابتدا دسته بندی محصول را مشخص کنید!'
                  : !resultArrayFinal.length
                  ? 'ویژگی های محصول را وارد کنید.'
                  : ''
              }
              rules={[
                {
                  required: true,
                  message: 'لطفا ویژگی محصول  را وارد کنید!',
                },
              ]}
            >
              <Cascader
                options={attributeList}
                style={{ width: '100%', minWidth: '234px' }}
                onChange={(e, x) => {
                  if (x) {
                    if (!x?.childs?.length) {
                      setSelectedAttrRow(x[x.length - 1]);
                    }
                  } else {
                    setSelectedOptionList([]);
                  }
                }}
                loading={attributeLoading}
                showSearch
                // value={selectedAttrRow?.id}
                fieldNames={{ label: 'name', value: 'id', children: 'childs' }}
                allowClear
              />
            </Form.Item>
          </div>
          <Form.Item label=" ">
            <IconBtn
              disabled={!selectedAttrRow}
              btnClass="greenIconBtn"
              onClick={() => {
                form.submit();
              }}
              icon={<LuPlus size={22} />}
            />
          </Form.Item>
        </div>
      </Form>

      <div className="">
        {resultArray?.map((item, index) => (
          <div
            key={item.id}
            className="d-flex gap-2 mb-4 align-items-center justify-content-between "
          >
            <div className="d-flex gap-3   align-items-center ">
              <div className="d-flex">
                <span>{item.full_name}/</span>
              </div>
              <div className="d-flex gap-2 ">
                {item.type === 'array' && (
                  <Select
                    style={{ width: '250px' }}
                    loading={attributeLoading}
                    options={item?.options}
                    value={resultArrayFinal.find((l) => l.attribute_id === item.id).options}
                    onChange={(e) => {
                      let newArray = [...resultArrayFinal];
                      const haveBefore = resultArrayFinal.findIndex(
                        (i) => i.attribute_id === item.id,
                      );
                      if (haveBefore >= 0) {
                        newArray[haveBefore].options = e;
                      } else {
                        newArray = [...resultArrayFinal, { attribute_id: item.id, options: e }];
                      }
                      setSelectedOptionList(e);
                      // const newArr = [...resultArrayFinal, { attribute_id: item.id, options: x }];
                      // newArr[index].options = e;
                      handleSetResultArrayFinal(newArray);
                    }}
                    mode="multiple"
                    fieldNames={{ label: 'value', value: 'id' }}
                  />
                )}
              </div>
            </div>
            <Tooltip title="حذف">
              <Button
                className="defIconBtn redIconBtn"
                onClick={() => {
                  const newResultArray = [...resultArray];
                  const newResultArrayFinal = [...resultArrayFinal];
                  newResultArray.splice(index, 1);
                  newResultArrayFinal.splice(index, 1);
                  setResultArray(newResultArray);
                  setResultArrayFinal(newResultArrayFinal);
                  setAttrOptions(newResultArrayFinal);
                }}
              >
                <IoTrashOutline size={20} />
              </Button>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseAttrOptions;
