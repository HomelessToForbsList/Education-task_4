import { Typography } from 'antd';
import { Select } from 'antd'
import styles from '../styles/Main.module.css'


import Header from './Header';
import WindCard from './WindCard'
import HumidityCard from './HumidityCard'
import PressureCard from './PressureCard'
import VisibilityCard from './VisibilityCard'

import { setMark } from '../store/chartDataSlice'
import { fetchChartData } from '../store/chartDataSlice'


import {useDataSelector, useChartDataSelector, useLocationSelector, useAppDispatch} from '../hooks'

import { Area } from '@ant-design/plots';

const { Option } = Select;

function Main() {

  const chartData = useChartDataSelector()
  const data = useDataSelector()
  const location = useLocationSelector()

  const dispatch = useAppDispatch()



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
    line: { color: '#2C4A7F', size: 4 },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff  1:rgba(44, 74, 127, 0.7)',
        style: { lineDash: [100, 100] }
      };
    }
  }

  const handleChange = (value: string) => {
    dispatch(setMark(value))
    dispatch(fetchChartData(location))
  };

  return (
    <div className={styles.head}>
      <Header />
      <div  >
        <Typography.Title level={4} className={styles.overview}>Today overview</Typography.Title>
        <div className={styles.card_container} >
          <WindCard data={data} />
          <HumidityCard data={data} />
          <PressureCard data={data} />
          <VisibilityCard data={data} />
        </div>
      </div>
      <div className={styles.chart_container} >
        <div style={{ display: 'flex' }}>
          <Select
            disabled={chartData.length > 0 ? false : true}
            defaultValue={ 'main.temp'}
            className={styles.chart_select}
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
        <div id="container" className={styles.chart_area} >
          <Area {...config} />
        </div>
      </div>
    </div>
  )
}

export default Main