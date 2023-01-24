export interface CardFormData {
  cardholderName: string
  cardNumber: string
  expiryYear: string
  expiryMonth: string
  cvc: string
}

export const CardFormDataDefault: CardFormData = Object.freeze({
  cardholderName: '',
  cardNumber: '',
  expiryYear: '',
  expiryMonth: '',
  cvc: '',
})

