import styles from './CardEntry.module.scss'
import { CardFormData, CardFormDataDefault } from '@/lib/types/CardFormData'
import CardFront from '@/components/card-entry/CardFront'
import CardBack from '@/components/card-entry/CardBack'
import { useMemo, useState } from 'react'
import ThankYou from '@/components/card-entry/ThankYou'
import { AnimatePresence, motion } from 'framer-motion'
import CardForm from '@/components/card-entry/CardForm'
import cardBack from '@/assets/images/bg-card-back.png'

export default function CardEntry () {
  const [cardFormData, setCardFormData] = useState<CardFormData>({ ...CardFormDataDefault })

  const success = useMemo(() => !!cardFormData.cardholderName, [
    cardFormData,
  ])

  return (
    <div className={styles.container}>
      <div className={styles.cardEntry}>
        <div className={styles.cardBackContainer}>
          <CardBack cvc={cardFormData.cvc} />
        </div>
        <div className={styles.cardFrontContainer}>
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
            {!success && <motion.div key="1">
              <CardForm onSubmit={(values: CardFormData) => setCardFormData(values)} />
            </motion.div>}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
