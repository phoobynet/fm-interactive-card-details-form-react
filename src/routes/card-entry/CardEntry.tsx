import styles from './CardEntry.module.scss'
import { Form, Formik } from 'formik'
import { CardFormDataDefault } from '@/lib/types/CardFormData'
import CardFront from '@/components/card-entry/CardFront'
import CardBack from '@/components/card-entry/CardBack'
import { cardFormValidation } from '@/lib/validation/cardFormValidation'
import CardholderNameGroup from '@/components/card-entry/CardholderNameGroup'
import CardNumberGroup from '@/components/card-entry/CardNumberGroup'
import CardExpiryMonthInput from '@/components/card-entry/CardExpiryMonthInput'
import CardExpiryYearInput from '@/components/card-entry/CardExpiryYearInput'
import CardCvcInput from '@/components/card-entry/CardCvcInput'

export default function Home () {
  return (
    <div className={styles.cardEntry}>
      <div className={styles.cardBack}>
        <CardBack />
      </div>
      <div className={styles.cardFront}>
        <CardFront />
      </div>
      <main>
        <Formik
          initialValues={{ ...CardFormDataDefault }}
          onSubmit={(values, actions) => {
            console.log(values)
          }}
          validate={cardFormValidation}
        >{props => {
          return (
            <Form
              className={styles.cardForm}
            >
              <CardholderNameGroup />
              <CardNumberGroup />

              <div className={styles.expiryCvcGroup}>
                <label
                  htmlFor="expiryMonth"
                  className={styles.expiryLabel}
                >Exp. date (mm/yy)</label>
                <div className={styles.expiryMonthInput}>
                  <CardExpiryMonthInput />
                </div>
                <div className={styles.expiryYearInput}>
                  <CardExpiryYearInput />
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
                  <CardCvcInput />
                </div>
                {props.touched.cvc && props.errors.cvc
                  ? <span
                    className={`error ${styles.cvcError}`}
                  >{props.errors.cvc}</span>
                  : null}
              </div>
              <button
                className={styles.confirmButton}
                type="submit"
              >Confirm
              </button>
            </Form>)
        }}
        </Formik>
      </main>
    </div>
  )
}
