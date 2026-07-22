import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CustomerLayout } from './layouts/CustomerLayout'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/customer/CartPage'
import { CheckoutPage } from './pages/customer/CheckoutPage'
import { MenuPage } from './pages/customer/MenuPage'
import { OrderConfirmationPage } from './pages/customer/OrderConfirmationPage'
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage'
import { OrdersListPage } from './pages/customer/OrdersListPage'
import { StaffOrdersPage } from './pages/staff/StaffOrdersPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#2D3B2D',
            color: '#fff',
            borderRadius: '999px',
            fontSize: '14px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<CustomerLayout />}>
          <Route path="/menu/:restaurantSlug/:tableId" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/order/:orderId/track" element={<OrderTrackingPage />} />
          <Route path="/orders" element={<OrdersListPage />} />
        </Route>

        <Route path="/staff/orders" element={<StaffOrdersPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
