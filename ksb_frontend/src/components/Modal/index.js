import { Button, Modal } from "antd";
import React, { useState } from "react";
import AddUserForm from "../Form";

const AddUserModal = ({ setDoUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add User
      </Button>
      <Modal
        title="Add User"
        visible={isModalVisible}
        // onOk={handleOk}
        okText=""
        onCancel={handleCancel}
      >
        <AddUserForm
          setDoUpdate={setDoUpdate}
          handleCloseModal={handleCancel}
        />
      </Modal>
    </>
  );
};

export default AddUserModal;
