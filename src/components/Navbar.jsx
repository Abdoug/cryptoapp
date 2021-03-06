import React, { useEffect, useState } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import CryptoCurrencyIcon from '../images/cryptocurrency.png';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (screenSize <= 800) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [screenSize]);

    const items = [
      {
          label: (
              <Link to="/">Consulting Crypto App</Link>
          ),
          key: 'd',
          icon: <Avatar src={CryptoCurrencyIcon} size="medium"/>,
      },
      {
          label: (
              <Link to="/">Home</Link>
          ),
          key: 'home',
          icon: <HomeOutlined />,
      },
      {
        label: (
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        ),
        key: 'cryptocurrencies',
        icon: <FundOutlined />,
      },
      {
          label: (
              <Link to="/exchanges">Exchanges</Link>
          ),
          key: 'exchanges',
          icon: <MoneyCollectOutlined />,
      },
      {
          label: (
            <Link to="/news">News</Link>
          ),
          key: 'news',
          icon: <BulbOutlined />,
      },
    ];

  return (
    <>
        <div className="logo" />
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined style={{color: "white"}}/></Button>
        {screenSize <= 800 && activeMenu ? <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={['0']}
          items={items}
        /> : (screenSize > 800 && <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={items}
         
        />)}
    </>
  )
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={CryptoCurrencyIcon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">Consulting Crypto App</Link>
            </Typography.Title>
        </div>
        <div>
          <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
          {activeMenu && <Menu theme='dark' items={items} />}
        </div>
    </div>
  )
}

export default Navbar
