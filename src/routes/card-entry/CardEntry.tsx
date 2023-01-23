import styles from '@/App.module.scss'
import { FormikErrors, useFormik } from 'formik'
import MaskedInput from 'react-text-mask'
import { parseISO, isValid, isBefore, addMonths, subDays } from 'date-fns'
import { padStart } from 'lodash'
import { CardFormData } from '@/lib/types/CardFormData'
import { cardMask } from '@/lib/validation/cardMask'

const now = Date.now()

export default function Home () {
  const formik = useFormik<CardFormData>({
    initialValues: {
      cardholderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
    },
    onSubmit (values) {

    },
    validate (values) {
      const errors: FormikErrors<CardFormData> = {}

      if (values.cardholderName?.trim().length === 0) {
        errors.cardholderName = `Can't be blank`
      }

      const cardNumber = (values.cardNumber?.trim() || '').replaceAll(' ', '').replaceAll('_', '')

      if (cardNumber.length === 0) {
        errors.cardNumber = `Can't be blank`
      } else if (cardNumber.length !== 16) {
        errors.cardNumber = `Wrong format, insufficient characters`
      }

      const expiryMonth = (values.expiryMonth?.trim() || '')
      const expiryMonthInt = parseInt(expiryMonth)

      if (expiryMonth.length === 0) {
        errors.expiryMonth = `Can't be blank`
      } else if (isNaN(expiryMonthInt)) {
        errors.expiryMonth = `Invalid value`
      }

      const expiryYear = (values.expiryYear?.trim() || '')
      const expiryYearInt = parseInt(expiryYear)

      if (expiryYear.length === 0) {
        errors.expiryYear = `Can't be blank`
      } else if (isNaN(expiryYearInt)) {
        errors.expiryYear = `Invalid value`
      }

      if (!errors.expiryMonth && !errors.expiryYear) {
        let expiryDate = parseISO(`20${expiryYearInt}-${padStart(expiryMonthInt.toString(), 2, '0')}-01`)

        if (!isValid(expiryDate)) {
          errors.expiryMonth = `Invalid date`
        } else {
          expiryDate = subDays(addMonths(expiryDate, 1), 1)

          if (isBefore(expiryDate, now)) {
            errors.expiryMonth = `Date in the past`
          }
        }

        errors.expiryYear = errors.expiryMonth
      }

      const cvc = (values.cvc?.trim() || '')
      const cvcInt = parseInt(cvc)

      if (cvc.length === 0) {
        errors.cvc = `Can't be blank`
      } else if (isNaN(cvcInt) || cvcInt < 100 || cvcInt > 9999) {
        errors.cvc = 'Invalid CVC'
      }

      return errors
    },
  })

  return (
    <div className={styles.container}>
      <main>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.cardForm}
        >
          <div>
            <label htmlFor="cardholderName">Cardholder name</label>
            <input
              type="text"
              id="cardholderName"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.cardholderName}
              aria-invalid={!!formik.errors.cardholderName && formik.touched.cardholderName}
              placeholder="e.g. Jane Appleseed"
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardholderName && formik.errors.cardholderName
              ? <span className="error">{formik.errors.cardholderName}</span>
              : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cardNumber">Card Number</label>
            <MaskedInput
              mask={cardMask}
              showMask={false}
              type="text"
              id="cardNumber"
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
              placeholder="e.g. 1234 5678 9123 0000"
              keepCharPositions={true}
              guide={false}
              aria-invalid={!!formik.errors.cardNumber && formik.touched.cardNumber}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber
              ? <span className="error">{formik.errors.cardNumber}</span>
              : null}
          </div>

          <div className={styles.expiryCvcGroup}>
            <label
              htmlFor="expiryMonth"
              className={styles.expiryLabel}
            >Exp. date (mm/yy)</label>
            <MaskedInput
              type="text"
              id="expiryMonth"
              className={styles.expiryMonthInput}
              onChange={formik.handleChange}
              value={formik.values.expiryMonth}
              mask={[/\d/, /\d/]}
              placeholder="MM"
              guide={false}
              aria-invalid={!!formik.errors.expiryMonth && formik.touched.expiryMonth}
              onBlur={(e) => {
                formik.setFieldValue('expiryMonth', padStart(e.currentTarget.value, 2, '0'))
                formik.handleBlur(e)
              }}
            />
            <MaskedInput
              type="text"
              id="expiryYear"
              className={styles.expiryYearInput}
              onChange={formik.handleChange}
              value={formik.values.expiryYear}
              mask={[/\d/, /\d/]}
              placeholder="YY"
              guide={false}
              aria-invalid={!!formik.errors.expiryYear && formik.touched.expiryYear}
              onBlur={formik.handleBlur}
            />
            {(formik.touched.expiryMonth || formik.touched.expiryYear) && (formik.errors.expiryMonth || formik.errors.expiryYear)
              ? <span
                className={`error ${styles.expiryError}`}
              >{formik.errors.expiryMonth || formik.errors.expiryYear}</span>
              : null}
            <label
              htmlFor="cvc"
              className={styles.cvcLabel}
            >CVC</label>
            <MaskedInput
              type="text"
              id="cvc"
              onChange={formik.handleChange}
              value={formik.values.cvc}
              mask={[/\d/, /\d/, /\d/, /\d/]}
              placeholder="e.g. 123"
              keepCharPositions={true}
              autoComplete="off"
              guide={false}
              aria-invalid={!!formik.errors.cvc && formik.touched.cvc}
              className={styles.cvcInput}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cvc && formik.errors.cvc
              ? <span
                className={`error ${styles.cvcError}`}
              >{formik.errors.cvc}</span>
              : null}
          </div>
          <button
            className={styles.confirmButton}
            type="submit"
          >Confirm
          </button>
        </form>
      </main>
    </div>
  )
}
