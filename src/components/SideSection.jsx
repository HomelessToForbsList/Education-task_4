import { Typography, Divider, Progress } from 'antd';
import { Skeleton } from 'antd';

import SideCard from './SideCard';

import { useSelector } from 'react-redux'

function SideSection() {

  const location = useSelector(state => state.location.location)
  const data = useSelector(state => state.data.data)

  let imgSrc = ''
  let time = new Date(Date.now())
  if (data?.main) imgSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  if (data?.dt) time = new Date((data.dt + data.timezone) * 1000)



  if (data?.main) {
    return (
      <div style={{ margin: 15, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Typography.Title level={4}>
              {location.name}
            </Typography.Title>
            <Typography.Paragraph style={{ color: '#DCECF9', fontWeight: 200 }}>
              {location.state ? location.state + ' ' + location.country : location.country}
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Title level={1}>{
              (time.getUTCHours() < 10 ? '0' + time.getUTCHours() : time.getUTCHours()) + ':' + (time.getUTCMinutes() < 10 ? '0' + time.getUTCMinutes() : time.getUTCMinutes())}
            </Typography.Title>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
          <div>
            <img src={imgSrc} alt='ico' />
            <Typography.Paragraph style={{ color: '#DCECF9', fontWeight: 200 }}>{data.weather[0].description}</Typography.Paragraph>
          </div>
          <Typography.Title level={1} style={{ marginBottom: '0.1em' }}>{Math.round(data.main.temp)}° C</Typography.Title>
        </div>
        <Typography.Title level={4} style={{ marginBottom: '0.1em', color: '#fff', textAlign: 'right' }}>feels like {Math.round(data.main.feels_like)}° C</Typography.Title>
        <Divider style={{ borderColor: '#8491A1', height: 10 }} />
        <div>
          <Typography.Title level={4}>Cloudiness</Typography.Title>
          <Progress percent={data.clouds.all} trailColor='#2A4263' strokeColor='#8CB2FB' strokeWidth={25} size="small" />
        </div>
        <div style={{ marginTop: 15 }}>
          <Typography.Title level={4}>Sunrise & Sunset</Typography.Title>
          <SideCard data={data} cardType='Sunrise' time={time} />
          <SideCard data={data} cardType='Sunset' time={time} />
        </div>
      </div>
    )
  }
  else return (<Skeleton />)
}

export default SideSection