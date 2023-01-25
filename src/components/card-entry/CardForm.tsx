import { CardFormData, CardFormDataDefault } from '@/lib/types/CardFormData'
import { cardFormValidation } from '@/lib/validation/cardFormValidation'
import { Form, Formik } from 'formik'
import styles from './CardForm.module.scss'
import CardFormCardholderNameGroup from '@/components/card-entry/CardFormCardholderNameGroup'
import CardFormCardNumberGroup from '@/components/card-entry/CardFormCardNumberGroup'
import CardFormExpiryMonthInput from '@/components/card-entry/CardFormExpiryMonthInput'
import CardFormExpiryYearInput from '@/components/card-entry/CardFormExpiryYearInput'
import CardFormCvcInput from '@/components/card-entry/CardFormCvcInput'
import Button from '@/components/card-entry/Button'

interface Props {
  onSubmit: (cardFormData: CardFormData) => void
}

export default function CardForm ({ onSubmit }: Props) {
  return (
    <Formik
      initialValues={{ ...CardFormDataDefault }}
      onSubmit={(values, actions) => {
        onSubmit({ ...values })
      }}
      validate={cardFormValidation}
    >{props => {
      return (
        <Form
          className={styles.cardForm}
        >
          <CardFormCardholderNameGroup />
          <CardFormCardNumberGroup />

          <div className={styles.expiryCvcGroup}>
            <label
              htmlFor="expiryMonth"
              className={styles.expiryLabel}
            >Exp. date (mm/yy)</label>
            <div className={styles.expiryMonthInput}>
              <CardFormExpiryMonthInput />
            </div>
            <div className={styles.expiryYearInput}>
              <CardFormExpiryYearInput />
            </div>
            {(props.touched.expiryMonth || props.touched.expiryYear) && (props.errors.expiryMonth || props.errors.expiryYear)
              ? <span
                className={`error ${styles.expiryError}`}
              >{props.errors.expiryMonth || props.errors.expiryYear}</span>
              : null}
            <label
              htmlFor="cvc"
              className={styles.cvcLabel}
            >CVC</label>
            <div className={styles.cvcInput}>
              <CardFormCvcInput />
            </div>
            {props.touched.cvc && props.errors.cvc
              ? <span
                className={`error ${styles.cvcError}`}
              >{props.errors.cvc}</span>
              : null}
          </div>
          <div className={styles.confirmButtonContainer}>
            <Button type="submit">Confirm</Button>
          </div>
        </Form>)
    }}
    </Formik>
  )
}
