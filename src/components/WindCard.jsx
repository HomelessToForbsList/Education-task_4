import { Typography } from 'antd';
import { Skeleton } from 'antd';


function WindCard(props){

  if(props.data?.wind?.speed)
  return(
    <div style={{display: 'flex',flex: '1 1 45%', marginTop: '5px',alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.02)', minHeight: 100, borderRadius: 5}}>
      <div style={{width:50, height:50, margin: '0 15px'}}>
        <img src='/img/card_icons/wind.png' alt='icon' style={{width: '100%'}} ></img>
      </div>
      <div className="mark">
      <Typography.Paragraph  style={{color: '#9B9AA0'}}>
        Wind speed
      </Typography.Paragraph>
      <Typography.Title level={2} style={{marginTop: 0}}>
        {props.data.wind.speed} km/h
      </Typography.Title>
      </div>
      <div className="difference" style={{display:'flex',alignItems: 'center', margin: '0 15px', color: 'red'}}>
      </div>
    </div>
  )
  else return(<Skeleton/>)
}

export default WindCard