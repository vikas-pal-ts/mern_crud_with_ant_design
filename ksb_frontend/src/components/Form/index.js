import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import React, { useRef } from "react";
import { postRequest } from "../helper/api_helper";

const AddUserForm = ({ setDoUpdate, handleCloseModal }) => {
  const formRef = useRef(null);
  const onFinish = async (values) => {
    const res = await postRequest("/addUser", values);
    if (res?.status === 1) {
      handleCloseModal();
      setDoUpdate(new Date().valueOf());
      formRef.current.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Form
      //   name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      ref={formRef}
      name="control-ref"
    >
      <Form.Item
        label="Username"
        name="userName"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your Phone!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
