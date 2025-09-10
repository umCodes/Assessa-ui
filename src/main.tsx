import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import LabProvider from './providers/LabProvider'
import AuthProvider from './providers/AuthProvider'
import QuizesProvider from './providers/QuizesProvider'
import MessageProvider from './providers/MessageProvider'
import Modal from './ui/Modal'
import Message from './ui/Message'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MessageProvider>
        <QuizesProvider>  
            <LabProvider>
                  <RouterProvider router={router} />
                  <Modal/>
                  <Message/>
            </LabProvider>
          </QuizesProvider>
      </MessageProvider>
    </AuthProvider>
  </StrictMode>,
)
