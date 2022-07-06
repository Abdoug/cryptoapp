import React, { useEffect, useState } from 'react'
import { useGetExchangesQuery } from '../services/cryptoApi'
import { Row, Col, Table, Typography } from 'antd';
import millify from 'millify'
import Loader from './Loader';

const { Title } = Typography

const Exchanges = () => {
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(10);
  const {data, isLoading} = useGetExchangesQuery(offset, limit);
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { iconUrl, name }) => (
        <>
          <img src={iconUrl} width='30' height='30' alt={name} style={{marginRight: '1rem'}}/> ${name}
        </>
      ),
    },
    {
      title: '24h Volume',
      dataIndex: 'hoursvolume',
      key: 'hoursvolume',
    },
    {
      title: 'Number of Markets',
      dataIndex: 'numberOfMarkets',
      key: 'numberOfMarkets',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'BTC Price',
      dataIndex: 'btcPrice',
      key: 'btcPrice',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   responsive: ['sm'],
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    let dataTableToBeSet = [];

    setLoading(true)

    if (data?.data?.coins) {
      data?.data?.coins.map((e, i) => {
        const { uuid: key, '24hVolume': hoursvolume, name, price, numberOfMarkets, btcPrice, coinrankingUrl, iconUrl } = e;

        dataTableToBeSet.push({
          key,
          name,
          hoursvolume: millify(hoursvolume, {
            precision: 3,
            lowercase: true
          }),
          numberOfMarkets: millify(numberOfMarkets),
          price: millify(price, {
            precision: 10,
            lowercase: true
          }),
          btcPrice: millify(btcPrice, {
            precision: 10,
            lowercase: true
          }),
          coinrankingUrl,
          iconUrl
        })

        return true;
      });
    }
    console.log(data?.data?.coins);
    setDataTable(dataTableToBeSet);
    setLoading(false)
  }, [data])

  const handleTableChange = (newPagination, filters, sorter) => {
    setOffset(newPagination.current);
    setLimit(newPagination.pageSize);
  };

  if (isLoading) return (<Loader />)

  return (
    <Row gutter={[10, 10]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Title level={2} className="home-title">Coin Exchanges</Title>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p>
                For more information, please do checkout this link:&nbsp;
                <a
                  target={'_blank'}
                  href={record.coinrankingUrl}
                  style={{
                    margin: 0,
                  }}
                  rel="noreferrer"
                >
                  {record.coinrankingUrl}
                </a>
              </p>
            ),
            rowExpandable: (record) => !!record.coinrankingUrl,
          }}
          dataSource={dataTable}
          loading={loading}
          pagination={{
            current: offset,
            pageSize: limit,
          }}
          onChange={handleTableChange}
        />
      </Col>
    </Row>
  )
}

export default Exchanges
