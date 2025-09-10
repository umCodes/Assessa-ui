import { createContext, type Dispatch, type SetStateAction } from "react";


export type Message = {
    text: string,
    status: 'success' | 'failure'
}

export type Modal = {
    text: string,
    options: {
        ok: {text: string, action: () => void},
        cancel: string
    }
}

type MessageState = {
    message: Message | null,
    setMessage: Dispatch<SetStateAction<Message | null>>
    sendMessage: (text: Message['text'], status: Message['status']) => void
}

type ModalState = {
    modal: Modal | null,
    setModal: Dispatch<SetStateAction<Modal | null>>
    sendModal: (text: Modal['text'], cancel: Modal['options'][ 'cancel'], ok: Modal['options']['ok']['text'], action: Modal['options']['ok']['action']) => void
}

export const MessageContext = createContext<MessageState & ModalState>({
    message: {
        text: '',
        status: 'success'
    },
    setMessage: () => {},
    sendMessage: () => {},
    modal: {
        text: '',
        options: {
            ok: {text: 'ok', action: () => {}},
            cancel: 'cancel'
        }
    },
    setModal: () => {},
    sendModal: () => {},
}) 