import './index.css'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'

import router from './components/routes/Routes/Routes'

import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './components/context/AuthContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
