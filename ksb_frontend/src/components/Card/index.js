import { Card, Col, Row } from "antd";
import React from "react";

const AppCard = ({ children }) => (
  <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={24}>
        <Card title="" bordered={false}>
          {children}
        </Card>
      </Col>
    </Row>
  </div>
);

export default AppCard;
