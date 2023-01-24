import styles from './ThankYou.module.scss'
import iconComplete from '@/assets/images/icon-complete.svg'
import Button from '@/components/card-entry/Button'

export default function ThankYou () {
  return (
    <div className={styles.thankYou}>
      <img
        src={iconComplete}
        alt=""
      />

      <header>
        <h1>
          thank you!
        </h1>
      </header>
      <p>We've added your card details</p>
      <div className={styles.continueButtonContainer}>
        <Button type="button">Continue</Button>
      </div>
    </div>
  )
}
