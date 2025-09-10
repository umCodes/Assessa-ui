import { useContext } from "react"
import { MessageContext } from "../context/MessageContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faExclamationCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"

const Message = () => {
  const { message } = useContext(MessageContext)
  
  if (!message) return null

  const getStatusConfig = () => {
    switch (message.status) {
      case 'success':
        return {
          bgColor: 'bg-emerald-500',
          textBg: 'bg-emerald-50',
          textColor: 'text-emerald-700',
          borderColor: 'border-emerald-200',
          icon: <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-white" />
        }
      case 'failure':
        return {
          bgColor: 'bg-red-500',
          textBg: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: <FontAwesomeIcon icon={faXmarkCircle} className="w-4 h-4 text-white" />
        }
      default:
        return {
          bgColor: 'bg-blue-500',
          textBg: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          icon: <FontAwesomeIcon icon={faExclamationCircle} className="w-4 h-4 text-white" />
        }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <div className={`
      z-50 flex gap-3 items-center 
      absolute top-4 right-4
      transform transition-all duration-500 ease-out
      ${message?.text ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}
    `}>
      {/* Message Text */}
      <div className={`
        ${statusConfig.textBg} ${statusConfig.borderColor} ${statusConfig.textColor}
        border px-4 py-2.5 rounded-xl
        shadow-lg backdrop-blur-sm
        max-w-xs
      `}>
        <p className="text-sm font-medium">
          {message.text}
        </p>
      </div>
      
      {/* Status Indicator */}
      <div className={`
        ${statusConfig.bgColor}
        w-10 h-10 rounded-full
        flex items-center justify-center
        shadow-lg ring-2 ring-white
        transition-transform duration-200 hover:scale-105
      `}>
        {statusConfig.icon}
      </div>
    </div>
  )
}

export default Message