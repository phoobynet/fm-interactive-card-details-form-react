import { useFormikContext } from 'formik'
import { CardFormData } from '@/lib/types/CardFormData'
import MaskedInput from 'react-text-mask'

export const cardMask = [/\d/,
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


export default function CardFormCardNumberGroup () {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormikContext<CardFormData>()

  return (
    <div>
      <label htmlFor="cardNumber">Card Number</label>
      <MaskedInput
        mask={cardMask}
        showMask={false}
        type="text"
        id="cardNumber"
        onChange={handleChange}
        value={values.cardNumber}
        placeholder="e.g. 1234 5678 9123 0000"
        keepCharPositions={true}
        guide={false}
        aria-invalid={!!errors.cardNumber && touched.cardNumber}
        onBlur={handleBlur}
      />
      {touched.cardNumber && errors.cardNumber
        ? <span className="error">{errors.cardNumber}</span>
        : null}
    </div>
  )
}
