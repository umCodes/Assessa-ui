import { useState, type ReactNode } from "react"
import { MessageContext, type Message, type Modal } from "../context/MessageContext"

const MessageProvider = ({children}: {children: ReactNode}) => {
    const [message, setMessage] = useState<Message | null>(null);
    const [modal, setModal] = useState<Modal | null>(null);

    function sendMessage(text: Message['text'], status: Message['status']){
        setMessage({
            text,
            status
        })

        setTimeout(() => {
          setMessage(null)  
        }, 4000)
    }
    function sendModal(text: Modal['text'], cancel: Modal['options']['cancel'], ok: Modal['options']['ok']['text'], action: Modal['options']['ok']['action'] ){
        setModal(
          {
            text,
            options: { ok: {text: ok, action: () => {
              action()
              setModal(null)
            }}, cancel}
          }
        )
    }
    return (
    <MessageContext.Provider value={{message, setMessage, sendMessage, modal, setModal, sendModal}}>
        {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider