import { Navigate } from 'react-router-dom'
import { demoRestaurant } from '../data/mockData'

export function HomePage() {
  return <Navigate to={`/menu/${demoRestaurant.slug}/table-1`} replace />
}
