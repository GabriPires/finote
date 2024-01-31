import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './pages/_layout.tsx/auth'
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
])
