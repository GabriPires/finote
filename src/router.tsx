import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layout.tsx/app'
import { AuthLayout } from './pages/_layout.tsx/auth'
import { DashboardPage } from './pages/dashboard/page'
import { SignInPage } from './pages/sign-in'
import { SignUpPage } from './pages/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
])
