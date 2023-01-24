import MaskedInput from 'react-text-mask'
import { useFormikContext } from 'formik'
import { CardFormData } from '@/lib/types/CardFormData'

export default function CardExpiryYearInput () {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormikContext<CardFormData>()
  return (
    <MaskedInput
      type="text"
      id="expiryYear"
      onChange={handleChange}
      value={values.expiryYear}
      mask={[/\d/, /\d/]}
      placeholder="YY"
      guide={false}
      aria-invalid={!!errors.expiryYear && touched.expiryYear}
      onBlur={handleBlur}
    />
  )
}
