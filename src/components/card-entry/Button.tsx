import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from './Button.module.scss'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

export default function Button (props: PropsWithChildren<Props>) {
  return (
    <button
      className={styles.button}
      {...props}
    >{props.children}
    </button>
  )
}
