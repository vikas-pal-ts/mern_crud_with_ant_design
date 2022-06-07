import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AppContainer, UserTable } from "../components";
import { getRequest } from "../components/helper/api_helper";
import { getEnvVariable } from "../environment";
const { Title } = Typography;

const originData = [];

for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const Home = () => {
  return (
    <>
      <span style={{ textAlign: "center", padding: "10px" }}>
        <Title>
          Ksbm Infotech <u style={{ color: `rgb(243,114,32)` }}>Users List</u>
        </Title>
      </span>
      <AppContainer>
        <UserTable />
      </AppContainer>
    </>
  );
};

export default Home;
