import { useFormikContext } from 'formik'
import { CardFormData } from '@/lib/types/CardFormData'

export default function CardFormCardholderNameGroup () {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormikContext<CardFormData>()
  return (
    <div>
      <label htmlFor="cardholderName">Cardholder name</label>
      <input
        type="text"
        id="cardholderName"
        autoComplete="off"
        onChange={handleChange}
        value={values.cardholderName}
        aria-invalid={!!errors.cardholderName && touched.cardholderName}
        placeholder="e.g. Jane Appleseed"
        onBlur={handleBlur}
      />
      {touched.cardholderName && errors.cardholderName
        ? <span className="error">{errors.cardholderName}</span>
        : null}
    </div>
  )
}
