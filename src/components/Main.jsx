import { Typography } from 'antd';
import React from 'react';
import { Select } from 'antd'
import { Skeleton } from 'antd';


import Header from './Header';
import WindCard from './WindCard'
import HumidityCard from './HumidityCard'
import PressureCard from './PressureCard'
import VisibilityCard from './VisibilityCard'

import { setMark } from '../store/chartDataSlice'
import { fetchChartData } from '../store/chartDataSlice'


import { useSelector, useDispatch } from 'react-redux'

import { Area } from '@ant-design/plots';

const { Option } = Select;

function Main() {

  const chartData = useSelector(state => state.chartData.chartData)
  const data = useSelector(state => state.data.data)
  const location = useSelector(state => state.location.location)

  const dispatch = useDispatch()


  const config = {
    data: chartData,
    xField: 'date',
    yField: 'mark',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
      label: {
        style: {
          fill: '#2C4A7F',
          fontSize: 20
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: '#2C4A7F',
          fontSize: 20,
        },
      },
      grid: {
        line: {
          style: {
            lineDash: [3, 3]
          }
        }
      }
    },
    smooth: true,
    height: '100%',
    line: { color: '#2C4A7F', size: 4 },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff  1:rgba(44, 74, 127, 0.7)',
        style: { lineDash: [100, 100] }
      };
    }
  }

  const handleChange = (value) => {
    dispatch(setMark(value))
    dispatch(fetchChartData(location))
  };

  return (
    <div className='head' style={{ height: '100%', justifyContent: 'start', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div className='ty' >
        <Typography.Title level={4} style={{ color: '#183051', fontWeight: 600, paddingLeft: '10px' }}>Today overview</Typography.Title>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px' }} >
          <WindCard data={data} />
          <HumidityCard data={data} />
          <PressureCard data={data} />
          <VisibilityCard data={data} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 50%' }} >
        <div style={{ display: 'flex' }}>
          <Select
            disabled={chartData.length > 0 ? false : true}
            defaultValue={{ value: 'main.temp', label: 'Temperature' }}
            style={{ width: 'auto', color: '#1890ff', fontWeight: 600, fontSize: '20px', lineHeight: 1.4, marginBottom: '0.5em', marginTop: 0 }}
            bordered={false}
            size='large'
            onChange={handleChange}>
            <Option value="main.temp">Temperature</Option>
            <Option value="wind.speed">Wind speed</Option>
            <Option value="main.humidity">Humidity</Option>
            <Option value="main.pressure">Pressure</Option>
          </Select>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography.Title level={4} style={{ color: '#183051', fontWeight: 600 }}> for the next 5 days</Typography.Title>
          </div>
        </div>
        <div id="container" style={{ height: '95%', backgroundColor: 'rgba(0, 0, 0, 0.02)', padding: '10px' }}>
          <Area {...config} />
        </div>
      </div>
    </div>
  )
}

export default Main