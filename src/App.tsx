import { Routes, Route } from 'react-router-dom'
import CardEntry from '@/routes/card-entry/CardEntry'

export default function App () {
  return (
    <Routes>
      <Route
        path="/"
        element={<CardEntry />}
      />
    </Routes>
  )
}
