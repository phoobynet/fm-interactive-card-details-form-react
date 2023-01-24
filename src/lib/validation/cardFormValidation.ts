import { CardFormData } from '@/lib/types/CardFormData'
import { FormikErrors } from 'formik'
import { addMonths, isBefore, isValid, parseISO, subDays } from 'date-fns'
import { padStart } from 'lodash'

const now = new Date()

export const cardFormValidation = (values: CardFormData): FormikErrors<CardFormData> => {
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
}
