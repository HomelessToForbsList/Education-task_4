import { Typography } from 'antd';
import { Skeleton } from 'antd';
import styles from '../styles/Card.module.css'
import type {CardProps} from '../types'



const HumidityCard: React.FC<CardProps> = function(props: CardProps) {



  if(props.data?.main?.humidity)
  return(
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <img src='/img/card_icons/humidity.png' alt='icon' style={{width: '100%'}} ></img>
      </div>
      <div className="mark">
      <Typography.Paragraph  style={{color: '#9B9AA0'}}>
        Humidity
      </Typography.Paragraph>
      <Typography.Title level={2} style={{marginTop: 0}}>
        {props.data.main.humidity} %
      </Typography.Title>
      </div>
      <div className={styles.difference}>
      </div>
    </div>
  )
  else return(<Skeleton/>)
}

export default HumidityCard