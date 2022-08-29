import { Typography } from 'antd';



function SideCard(props) {

  const sunTime = new Date((props.cardType === 'Sunrise' ? props.data.sys.sunrise : props.data.sys.sunset) * 1000)

  let timeDifference = sunTime.getUTCHours() - props.time.getUTCHours()
  if (timeDifference < 0) timeDifference *= (-1)



  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)', minHeight: 100, borderRadius: 5, marginTop: 15 }}>
      <div style={{ width: 50, height: 50, margin: '0 15px' }}>
        {props.cardType === 'Sunrise' ?
          <img src='/img/sunrise.png' alt='icon' style={{ width: '100%' }} ></img>
          : <img src='/img/sunset.png' alt='icon' style={{ width: '100%' }} ></img>}
      </div>
      <div className="mark">
        <Typography.Paragraph style={{ color: '#9B9AA0' }}>
          {props.cardType}
        </Typography.Paragraph>
        <Typography.Title level={4} style={{ marginTop: 0, color: '#fff' }}>
          {(sunTime.getUTCHours() < 10 ? '0' + sunTime.getUTCHours() : sunTime.getUTCHours()) + ':' + (sunTime.getUTCMinutes() < 10 ? '0' + sunTime.getUTCMinutes() : sunTime.getUTCMinutes())}
        </Typography.Title>
      </div>
      <div className="difference" style={{ display: 'flex', alignItems: 'center', margin: '0 15px', color: 'red' }}>
        <Typography.Title level={5} style={{ color: '#9B9AA0', marginBottom: 0 }}>
          {sunTime.getUTCHours() > props.time.getUTCHours() ? `in ${timeDifference} hours` : `${timeDifference} hours ago`}
        </Typography.Title>
      </div>
    </div>
  )
}

export default SideCard