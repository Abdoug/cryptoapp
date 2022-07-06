import React, { useEffect, useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptosNewsQuery } from '../services/cryptoNews'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

const demoImg = 'https://picsum.photos/200/300';

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const {data: cryptoNewsData, isFetching, isLoading} = useGetCryptosNewsQuery({ newsCategory, count })
  const {data: cryptoCurrencies} = useGetCryptosQuery(100);
  
  if (isLoading || isFetching) return (<Loader />)

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={value => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 1 }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptoCurrencies?.data?.coins.map((coin, index) => <Option key={index} value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNewsData?.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImg} alt="news" style={{maxWidth: '200px', maxHeight: '100px'}}/>
              </div>
              <p>
                {news.description.length > 100 ?
                  `${news.description.substring(0, 100)} ...`
                  : news.description
                }
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImg} alt="news"/>
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News