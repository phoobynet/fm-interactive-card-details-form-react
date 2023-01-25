import MaskedInput from 'react-text-mask'
import { useFormikContext } from 'formik'
import { CardFormData } from '@/lib/types/CardFormData'

export default function CardFormCvcInput () {
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
      id="cvc"
      onChange={handleChange}
      value={values.cvc}
      mask={[/\d/, /\d/, /\d/, /\d/]}
      placeholder="e.g. 123"
      keepCharPositions={true}
      autoComplete="off"
      guide={false}
      aria-invalid={!!errors.cvc && touched.cvc}
      onBlur={handleBlur}
    />
  )
}
