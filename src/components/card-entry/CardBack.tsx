import cardBack from '@/assets/images/bg-card-back.png'
import { useMemo } from 'react'
import styles from './CardBack.module.scss'

interface Props {
  cvc?: string
}

export default function CardBack (props: Props) {
  const cvc = useMemo(() => props.cvc || '000', [props.cvc])
  return (
    <div className={styles.cardBack}>
      <img
        src={cardBack}
        alt=""
        className="card"
      />
      <div className={styles.cvc}>
        {cvc}
      </div>
    </div>
  )
}
