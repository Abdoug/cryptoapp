import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Typography } from "antd";
import { HomePage, Cryptocurrencies, CryptocurrencyDetails, Exchanges, Navbar, News } from './components'
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            width: '50%',
            position: 'fixed',
            left: '15%',
            right: '15%',
            top: '1rem',
            zIndex: '1'
          }}>
        <Navbar />
      </Header>
      <Content className="site-layout" style={{ padding: '3rem 10rem', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Layout>
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
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Typography.Title level={5}>
          ©2022 Consulting Crypto App -&nbsp;
          <a href={'https://github.com/Abdoug'} rel="noreferrer" target='_blank'>Abdoug</a>
        </Typography.Title>
      </Footer>
    </Layout>
  );
}

export default App;
