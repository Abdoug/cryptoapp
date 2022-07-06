import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isLoading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    let dataToBeSet = cryptoList?.data?.coins;

    if (search) dataToBeSet = cryptoList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    setCryptos(dataToBeSet)
  }, [cryptoList, search])
  
  if (isLoading) return (<Loader />)

  return (
    <>
      {!simplified && <div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={e => setSearch(e.target.value)}/>
      </div>}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency, index) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={index}>
            <Link to={`/cryptocurrency_details/${currency.uuid}`}>
              <Card
                title={`${currency.name}`}
                extra={<img alt={currency.rank} className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies