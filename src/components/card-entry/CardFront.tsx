import cardFront from '@/assets/images/bg-card-front.png'
import cardLogo from '@/assets/images/card-logo.svg'
import { useMemo } from 'react'
import styles from './CardFront.module.scss'

interface Props {
  cardNumber?: string
  cardName?: string
  cardExpiryMonth?: string
  cardExpiryYear?: string
}

export default function CardFront (props: Props) {
  const cardNumber = useMemo(() =>
    props.cardNumber
      ? props.cardNumber
      : '0000 0000 0000 0000', [props.cardNumber])

  const cardName = useMemo(() =>
      props.cardName
        ? props.cardName
        : 'jane appleseed'
    , [props.cardName])

  const cardExpiry = useMemo(() => props.cardExpiryMonth && props.cardExpiryYear
    ? `${props.cardExpiryMonth}/${props.cardExpiryYear}`
    : '00/00', [props.cardExpiryMonth, props.cardExpiryYear])
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={cardFront}
        alt=""
        className={`card`}
      />
      <div className={styles.content}>
        <img
          src={cardLogo}
          alt=""
          className={styles.logo}
        />
        <div className={styles.number}>
          {cardNumber}
        </div>
        <div className={styles.footer}>
          <div>
            {cardName}
          </div>
          <div>{cardExpiry}</div>
        </div>
      </div>
    </div>
  )
}
