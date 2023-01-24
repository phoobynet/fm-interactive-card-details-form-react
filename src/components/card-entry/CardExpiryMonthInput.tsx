import { useFormikContext } from 'formik'
import { CardFormData } from '@/lib/types/CardFormData'
import MaskedInput from 'react-text-mask'
import { padStart } from 'lodash'

export default function CardExpiryMonthInput () {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
  } = useFormikContext<CardFormData>()
  return (
    <MaskedInput
      type="text"
      id="expiryMonth"
      onChange={handleChange}
      value={values.expiryMonth}
      mask={[/\d/, /\d/]}
      placeholder="MM"
      guide={false}
      aria-invalid={!!errors.expiryMonth && touched.expiryMonth}
      onBlur={(e) => {
        setFieldValue('expiryMonth', padStart(e.currentTarget.value, 2, '0'))
        handleBlur(e)
      }}
    />
  )
}
