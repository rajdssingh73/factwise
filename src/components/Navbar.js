import React from 'react';
import { Layout, Typography } from 'antd';
import "../../src/App.css"
const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header className="navbar" style={{ backgroundColor: '#CDFADB', position: 'sticky', top: 0, zIndex: 1 }}>
      <div className="logo">
        <Title level={1} style={{ color: '#FF8080', margin: 0 }}>FactWise</Title>
      </div>
    </Header>
  );
};

export default Navbar;
