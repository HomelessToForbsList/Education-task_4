import React from 'react';
import { Typography, Divider, Progress } from 'antd';
import { Skeleton } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { message } from 'antd';

import SideCard from './SideCard';

import { useDispatch, useSelector } from 'react-redux'
import { setList } from '../store/savedLocationsSlice'

function SideSection() {

  const [isFavourite, setIsFavourite] = React.useState(false)

  const dispatch = useDispatch()

  const location = useSelector(state => state.location.location)
  const data = useSelector(state => state.data.data)

  let imgSrc = ''
  let time = new Date(Date.now())
  if (data?.main) imgSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  if (data?.dt) time = new Date((data.dt + data.timezone) * 1000)

  function addLocationToFavourite() {
    let locations = localStorage.getItem('locations')
    if (locations === null) locations = []
    else locations = JSON.parse(locations)
    if (locations.length < 3) locations.push(location)
    else {
      locations.shift()
      locations.push(location)
    }
    localStorage.setItem('locations', JSON.stringify(locations))
    dispatch(setList(locations))
    setIsFavourite(true)
    message.info('Location saved!');
  }

  function removeLocationFromFavourite() {
    let locations = localStorage.getItem('locations')
    if (locations !== null && locations.length > 0) {
      locations = JSON.parse(locations)
      locations = locations.filter(el => el.value !== location.value)
      localStorage.setItem('locations', JSON.stringify(locations))
      dispatch(setList(locations))
      setIsFavourite(false)
      message.info('Location removed!');
    }
  }

  React.useEffect(() => {
    let locations = localStorage.getItem('locations')
    locations = JSON.parse(locations)
    if (locations !== null && locations.length > 0) {
      const index = locations.findIndex(el => el.value === location.value)
      if (index > -1) setIsFavourite(true)
      else setIsFavourite(false)
    }
  }, [location])



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
        <div style={{ position: 'absolute', right: 0, bottom: 0, textAlign: 'right', padding: '5px 10px' }} >
          {isFavourite ?
            <HeartFilled
              style={{ fontSize: '30px', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
              onClick={removeLocationFromFavourite}
            /> :
            <HeartOutlined
              style={{ fontSize: '30px', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
              onClick={addLocationToFavourite}
            />
          }
        </div>
      </div>
    )
  }
  else return (<Skeleton />)
}

export default SideSection