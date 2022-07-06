import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space, Row, Col } from "antd";
import { HomePage, Cryptocurrencies, CryptocurrencyDetails, Exchanges, Navbar, News } from './components'
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout style={{overflowY: 'scroll', height: '90%'}}>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route exact path="/exchanges" element={<Exchanges />}/>
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}/>
              <Route exact path="/cryptocurrency_details/:coinId" element={<CryptocurrencyDetails />}/>
              <Route exact path="/news" element={<News />}/>
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{color: 'white'}}>
            Crypto App <br />
            <a href={'https://github.com/Abdoug'} rel="noreferrer" target='_blank'>Abdoug</a>
          </Typography.Title>
          <Space>
            <Link to={"/"}>Home</Link><span style={{color: '#1890ff', opacity: .5}}>|</span>
            <Link to={"/exchanges"}>Exchanges</Link><span style={{color: '#1890ff', opacity: .5}}>|</span>
            <Link to={"/news"}>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
