import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { deleteRequest, getRequest, putRequest } from "../helper/api_helper";
import AddUserModal from "../Modal";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserTable = ({ originData }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [doUpdate, setDoUpdate] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const getUserList = async () => {
    const data = await getRequest("/getUser");
    if (data?.status === 1 && Array.isArray(data?.data)) {
      const userData = data?.data.map((item) => {
        return { ...item, key: item?._id };
      });
      setData(userData);
    }
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      const updatedInput = { ...newData[index], userId: newData[index]?._id };

      const res = await putRequest("/updateUser", updatedInput);
    } catch (errInfo) {}
  };

  const onDelete = async (currentRow) => {
    const res = await deleteRequest("/deleteUser", { userId: currentRow?._id });

    if (res?.status === 1) {
      setDoUpdate(new Date().valueOf());
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      width: "25%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "40%",
      editable: true,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href="#">Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, record) => {
        return (
          <Typography.Link
            onClick={() => {
              onDelete(record);
            }}
          >
            Delete
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(() => {
    getUserList();
  }, [doUpdate]);

  return (
    <Form form={form} component={false}>
      <AddUserModal setDoUpdate={setDoUpdate} />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default UserTable;
