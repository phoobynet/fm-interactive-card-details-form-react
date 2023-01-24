import styles from './CardEntry.module.scss'
import { Form, Formik } from 'formik'
import { CardFormData, CardFormDataDefault } from '@/lib/types/CardFormData'
import CardFront from '@/components/card-entry/CardFront'
import CardBack from '@/components/card-entry/CardBack'
import { cardFormValidation } from '@/lib/validation/cardFormValidation'
import CardholderNameGroup from '@/components/card-entry/CardholderNameGroup'
import CardNumberGroup from '@/components/card-entry/CardNumberGroup'
import CardExpiryMonthInput from '@/components/card-entry/CardExpiryMonthInput'
import CardExpiryYearInput from '@/components/card-entry/CardExpiryYearInput'
import CardCvcInput from '@/components/card-entry/CardCvcInput'
import Button from '@/components/card-entry/Button'
import { useState } from 'react'
import ThankYou from '@/components/card-entry/ThankYou'
import { AnimatePresence, motion } from 'framer-motion'

export default function CardEntry () {
  const [success, setSuccess] = useState<boolean>(false)
  const [cardFormData, setCardFormData] = useState<CardFormData>({ ...CardFormDataDefault })
  return (
    <div className={styles.container}>
      <div className={styles.cardEntry}>
        <div className={styles.cardBack}>
          <CardBack cvc={cardFormData.cvc} />
        </div>
        <div className={styles.cardFront}>
          <CardFront
            cardNumber={cardFormData.cardNumber}
            cardExpiryMonth={cardFormData.expiryMonth}
            cardExpiryYear={cardFormData.expiryYear}
            cardName={cardFormData.cardholderName}
          />
        </div>
        <main>
          <AnimatePresence>
            {success && <motion.div
              key="0"
              initial={{
                x: 300,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -300,
                opacity: 0,
              }}
            ><ThankYou /></motion.div>}
            {!success && <motion.div key="1"><Formik
              initialValues={{ ...CardFormDataDefault }}
              onSubmit={(values, actions) => {
                console.log('Submit called')
                setSuccess(true)
                setCardFormData({
                  ...values,
                })
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
                  <Button type="submit">Confirm</Button>
                </Form>)
            }}
            </Formik></motion.div>}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
