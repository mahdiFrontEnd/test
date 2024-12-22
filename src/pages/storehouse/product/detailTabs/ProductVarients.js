import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Tooltip } from 'antd';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import { IoTrashOutline } from 'react-icons/io5';
import Products from '../../../../api/http_request/Model/products/Products';
import GetAttributeList from '../../../../api/http_request/Model/products/GetAttributeList';
import IconBtn from '../../../../components/MicroComponents/button/IconBtn';


const ProductVarients = ({ setCurrent }) => {
  const { id } = useParams();
  const [measurementList, setMeasurementList] = useState();
  const [measurementName, setMeasurementName] = useState('');
  console.log(setMeasurementList);
  const [form] = Form.useForm();
  const [varient, setVarient] = useState([]);
  const [varientList, setVarientList] = useState([]);
  const [attributeList, setAttributeList] = useState();
  const [attributeLoading, setAttributeLoading] = useState(true);
  const [packageList, setPackageList] = useState([]);
  const [packageName, setPackageName] = useState('');
  console.log(setPackageList);
  // useEffect(() => {
  //   getMeasurement(({ result }) => {
  //     setMeasurementList(result);
  //   });
  // }, []);
  const onFinish = (values) => {
    const stringifyVarient = JSON.stringify(varient);
    let hasBefore = false;
    // eslint-disable-next-line array-callback-return,consistent-return
    varientList.map((item) => {
      if (JSON.stringify(item) === stringifyVarient) {
        hasBefore = true;
      }
    });
    if (hasBefore) {
      toast.error('این مورد قبلا اضافه شده!');
    } else {
      const data = {
        items: varient,
        product_id: id,
        package_type: values.package_type,
        measurement_id: values.measurement_id,
      };
      Products.request({
        success: (response) => {
          const newVarient = [
            {
              values: [...varient],
              id: response?.result?.id,
              package_type: packageName,
              unit_of_measurement: measurementName,
            },
            ...varientList,
          ];
          setVarientList([...newVarient]);
          form.resetFields();
        },
        error: (res) => {
          toast.error(res.message);
        },
        final: () => {
        },
      }).skuCreate(data);
    }
  };

  useEffect(() => {
    if (id) {
      Products.request({
        success: (response) => {
          setVarientList(response?.result?.data);
        },
        error: (res) => {
          toast.error(res.message);
        },
        final: () => {
        },
      })
        .addParams({ product_id: id })
        .skuList();

      GetAttributeList(setAttributeList, setAttributeLoading, {
        type: 'varient',
        product_id: id,
      });
    }
  }, [id]);

  const handleChange = (attrItem, value, optionItem) => {
    const newVarient = [...varient];

    const beforeIndex = newVarient.findIndex((i) => i?.attribute?.id === attrItem.id);

    if (beforeIndex >= 0) {
      newVarient[beforeIndex] = {
        attribute_id: attrItem?.id,
        attribute: attrItem,
        value,
        option: optionItem,
        option_id: optionItem?.id,
        // type_id: packingType?.value,
        // unit_of_measurement: measurement?.value,
        // packingType,
        // measurement,
      };
      setVarient(newVarient);
    } else {
      setVarient([
        ...varient,
        {
          attribute_id: attrItem?.id,
          attribute: attrItem,
          value,
          option: optionItem,
          option_id: optionItem?.id,
          // type_id: packingType?.value,
          // unit_of_measurement: measurement?.value,
          // packingType,
          // measurement,
        },
      ]);
    }
  };
  // useEffect(() => {
  //   Common.request({
  //     success: ({ result }) => {
  //       setPackageList(result);
  //     },
  //     error: (res) => {
  //       toast.error(res.message);
  //     },
  //     final: () => {
  //     },
  //   }).packageList();
  // }, []);

  const handleDelete = (index, x) => {
    Products.request({
      success: () => {
        const newVarientList = [...varientList];
        newVarientList.splice(index, 1);
        setVarientList(newVarientList);
      },
      error: (res) => {
        toast.error(res.message);
      },
      final: () => {
      },
    }).skuDelete(x);
  };
  return (
    <Form name="basic" form={form} layout="vertical" onFinish={onFinish}>
      {!attributeLoading && (
        <>
          {attributeList.length > 0 ? (
            <div className="d-flex gap-2">
              {attributeList.map((item) => (
                <div key={item.id} className="d-flex gap-2">
                  {item?.type === 'array' ? (
                    <Form.Item
                      name={`option${item.id}`}
                      valuePropName="fileList"
                      label={item?.full_name}
                      rules={[
                        {
                          required: true,
                          message: ` لطفا ${item?.full_name} را وارد کنید!`,
                        },
                      ]}
                    >
                      <Select
                        style={{ width: '200px' }}
                        allowClear
                        options={item.options}
                        fieldNames={{ label: 'name', value: 'value' }}
                        onChange={(e, x) => {
                          handleChange(item, null, x);
                        }}
                      />
                    </Form.Item>
                  ) : item?.type === 'string' ? (
                    <Form.Item
                      name={`option${item.id}`}
                      valuePropName="fileList"
                      label={item.full_name}
                      rules={[
                        {
                          required: true,
                          message: ` لطفا ${item?.full_name} را وارد کنید!`,
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '200px' }}
                        onChange={(e) => {
                          handleChange(item, e.target.value, null);
                        }}
                      />
                    </Form.Item>
                  ) : (
                    item?.type === 'int' && (
                      <Form.Item
                        name={`option${item.id}`}
                        // valuePropName="fileList"
                        label={item.full_name}
                        rules={[
                          {
                            required: true,
                            message: ` لطفا ${item?.full_name} را وارد کنید!`,
                          },
                        ]}
                      >
                        <InputNumber
                          min={0.1}
                          style={{ width: '200px' }}
                          type="number"
                          onChange={(e) => {
                            handleChange(item, e, null);
                          }}
                        />
                      </Form.Item>
                    )
                  )}
                </div>
              ))}
              <Form.Item
                name="package_type"
                valuePropName="fileList"
                label="نوع دسته بندی"
                rules={[
                  {
                    required: true,
                    message: ` لطفا نوع دسته بندی را وارد کنید!`,
                  },
                ]}
              >
                <Select
                  onChange={(e, x) => {
                    setPackageName(x?.name);
                  }}
                  style={{ width: '200px' }}
                  allowClear
                  options={packageList}
                  fieldNames={{ label: 'name', value: 'value' }}
                />
              </Form.Item>
              <Form.Item
                name="measurement_id"
                label="واحد اندازه گیری"
                rules={[
                  {
                    required: true,
                    message: ` لطفا واحد اندازه گیری را وارد کنید!`,
                  },
                ]}
              >
                <Select
                  onChange={(e, x) => {
                    setMeasurementName(x?.name);
                  }}
                  style={{ width: '200px' }}
                  allowClear
                  options={measurementList}
                  fieldNames={{ label: 'name', value: 'value' }}
                />
              </Form.Item>
              <Form.Item label=" ">
                <IconBtn
                  btnClass="greenIconBtn"
                  onClick={() => {
                    form.submit();
                  }}
                  icon={<LuPlus size={22} />}
                />
              </Form.Item>
            </div>
          ) : (
            <p>برای این محصول هیچ ویژگی انتخاب نکرده اید.</p>
          )}
        </>
      )}

      {varientList.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="d-flex gap-2 mb-3 align-items-center" key={index}>
          <Tooltip title="حذف">
            <Button
              className="defIconBtn redIconBtn"
              onClick={() => {
                handleDelete(index, item.id);
              }}
            >
              <IoTrashOutline size={20} />
            </Button>
          </Tooltip>
          {item?.values.map((i) => (
            <div
              className="d-flex gap-2 border-1 border border-gray p-2 rounded-3 keyValue"
              key={i.attribute_id}
            >
              <div className="key">{i.attribute?.full_name}:</div>
              <div className="value">{i.option?.value || i.value}</div>
            </div>
          ))}

          <div className="d-flex gap-2 border-1 border border-gray p-2 rounded-3 keyValue">
            <div className="key">نوع دسته بندی:</div>
            <div className="value">{item.package_type}</div>
          </div>
          <div className="d-flex gap-2 border-1 border border-gray p-2 rounded-3 keyValue">
            <div className="key">واحد اندازه گیری:</div>
            <div className="value">{item.unit_of_measurement}</div>
          </div>
        </div>
      ))}

      <div className="d-flex gap-2 justify-content-end">
        <Button
          className="defBtn redBtn"
          onClick={() => {
            setCurrent(1);
          }}
        >
          بازگشت
        </Button>
        <Button className="defBtn orangeBtn" onClick={() => setCurrent(3)}>
          ثبت
        </Button>
      </div>
    </Form>
  );
};

export default ProductVarients;
