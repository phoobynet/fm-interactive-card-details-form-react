import styles from '@/App.module.scss'
import { FormikErrors, useFormik } from 'formik'
import MaskedInput from 'react-text-mask'
import { useMemo, useState } from 'react'
import { format, addYears, parseISO, isValid, isBefore, addMonths, subDays } from 'date-fns'
import { padStart } from 'lodash'

const now = Date.now()
const startYear = parseInt(format(now, 'yy'))
const endYear = parseInt(format(addYears(now, 20), 'yy'))

enum ExpiryErrorType {
  none = 0,
  monthBlank = 1 << 0,
  monthJunk = 1 << 1,
  monthOutOfRange = 1 << 2,
  yearBlank = 1 << 3,
  yearJunk = 1 << 4,
  yearOutOfRange = 1 << 5,
  inThePast = 1 << 6,
}

interface CardFormData {
  cardholderName: string
  cardNumber: string
  expiryYear: string
  expiryMonth: string
  cvc: string
}

const CARD_NUMBER_MASK = [/\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/]

export default function Home () {
  const [expiryErrorType, setExpiryErrorType] = useState<ExpiryErrorType>(ExpiryErrorType.none)

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
      let expiryMonthError = true

      if (expiryMonth.length == 0) {
        setExpiryErrorType(ExpiryErrorType.monthBlank)
      } else if (isNaN(expiryMonthInt)) {
        setExpiryErrorType(ExpiryErrorType.monthJunk)
      } else if (expiryMonthInt < 1 || expiryMonthInt > 12) {
        setExpiryErrorType(ExpiryErrorType.monthOutOfRange)
      } else {
        expiryMonthError = false
      }

      if (expiryMonthError) {
        errors.expiryMonth = '*'
      }

      const expiryYear = (values.expiryYear?.trim() || '')
      const expiryYearInt = parseInt(expiryYear)
      let expiryYearError = true

      if (expiryYear.length == 0) {
        setExpiryErrorType(state => state | ExpiryErrorType.yearBlank)
      } else if (isNaN(expiryYearInt)) {
        setExpiryErrorType(state => state | ExpiryErrorType.yearJunk)
      } else if (expiryYearInt < startYear || expiryYearInt > endYear) {
        setExpiryErrorType(state => state | ExpiryErrorType.yearOutOfRange)
      } else {
        expiryYearError = false
      }

      if (expiryYearError) {
        errors.expiryYear = '*'
      }

      if (!expiryMonthError && !expiryYearError) {
        let expiryDate = parseISO(`20${expiryYearInt}-${padStart(expiryMonthInt.toString(), 2, '0')}-01`)

        if (!isValid(expiryDate)) {
          throw new Error('invalid expiry date - contact developer')
        }

        expiryDate = subDays(addMonths(expiryDate, 1), 1)

        if (isBefore(expiryDate, now)) {
          setExpiryErrorType(state => state | ExpiryErrorType.inThePast)
        }
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

  const expiryError = useMemo<string>(() => {
    let error = ''

    const monthBlank = (ExpiryErrorType.monthBlank | expiryErrorType) === ExpiryErrorType.monthBlank
    const yearBlank = (ExpiryErrorType.yearBlank | expiryErrorType) === ExpiryErrorType.yearBlank

    const monthJunk = (ExpiryErrorType.monthJunk | expiryErrorType) === ExpiryErrorType.monthJunk
    const yearJunk = (ExpiryErrorType.yearJunk | expiryErrorType) === ExpiryErrorType.yearJunk

    const monthOutOfRange = (ExpiryErrorType.monthOutOfRange | expiryErrorType) === ExpiryErrorType.monthOutOfRange
    const yearOutOfRange = (ExpiryErrorType.yearOutOfRange | expiryErrorType) === ExpiryErrorType.yearOutOfRange

    const inThePast = (ExpiryErrorType.inThePast | expiryErrorType) === ExpiryErrorType.inThePast

    if (monthBlank || yearBlank) {
      error = `Can't be blank`
    } else if ((yearJunk || monthJunk) || monthOutOfRange || yearOutOfRange) {
      error = `Invalid month/year `
    } else if (inThePast) {
      error = `Expired`
    }

    return error
  }, [expiryErrorType])

  return (
    <div className={styles.container}>
      <main>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.cardForm}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="cardholderName">Cardholder name</label>
            <input
              type="text"
              id="cardholderName"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.cardholderName}
              data-invalid={!!formik.errors.cardholderName && formik.touched.cardholderName}
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
              mask={CARD_NUMBER_MASK}
              showMask={false}
              type="text"
              id="cardNumber"
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
              placeholder="e.g. 1234 5678 9123 0000"
              keepCharPositions={true}
              guide={false}
              data-invalid={!!formik.errors.cardNumber && formik.touched.cardNumber}
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
              data-invalid={!!formik.errors.expiryMonth && formik.touched.expiryMonth}
              onBlur={formik.handleBlur}
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
              data-invalid={!!formik.errors.expiryYear && formik.touched.expiryYear}
              onBlur={formik.handleBlur}
            />
            {(formik.touched.expiryMonth || formik.touched.expiryYear) && (formik.errors.expiryMonth || formik.errors.expiryYear)
              ? <span
                className={`error ${styles.expiryError}`}
              >{expiryError}</span>
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
              guide={false}
              data-invalid={!!formik.errors.cvc && formik.touched.cvc}
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
