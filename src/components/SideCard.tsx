import { Typography } from 'antd';
import  styles from '../styles/SideCard.module.css';
import type { Data } from  '../types'

interface SideCardProps{
  cardType: string;
  data: Data;
  time: Date;
}

const SideCard: React.FC<SideCardProps> = function(props: SideCardProps) {

  const sunTime = new Date((props.cardType === 'Sunrise' ? props.data.sys.sunrise : props.data.sys.sunset) * 1000)

  let timeDifference = sunTime.getUTCHours() - props.time.getUTCHours()
  if (timeDifference < 0) timeDifference *= (-1)



  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
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
      <div className={styles.difference}>
        <Typography.Title level={5} style={{ color: '#9B9AA0', marginBottom: 0 }}>
          {sunTime.getUTCHours() > props.time.getUTCHours() ? `in ${timeDifference} hours` : `${timeDifference} hours ago`}
        </Typography.Title>
      </div>
    </div>
  )
}

export default SideCard