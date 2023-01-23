import { ButtonHTMLAttributes } from 'react'
import styles from './ConfirmButton.module.scss'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>

export default function ConfirmButton (props: Props) {
  return (
    <button
      className={styles.confirmButton}
      type="submit"
    >Confirm
    </button>
  )
}
