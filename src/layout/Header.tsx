// Header.jsx
import { useContext } from "react"
import Logo from "../ui/Logo"
import NavBar from "../ui/NavBar"
import { AuthContext } from "../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  const {user} = useContext(AuthContext)
  return (
  <>
        <header className="h-[15%] relative">
      
      <div className="flex items-center p-2 gap-2">
          <div className="flex items-center flex-shrink-0">
            <Logo/>
          </div>
        <NavBar />
      </div>

      <div className="flex items-end bg-zinc-50 py-1">
      {user && (
        <>
        <h1 className="text-md font-semibold text-zinc-800 ml-4 hidden md:block">
          Welcome, {user.name}!
        </h1>
        <div className="flex items-center flex-shrink-0 ml-auto">
            <p className="text-sm text-zinc-600">
              <span className="hidden md:inline font-bold">Credits:</span> {user.credits}
            </p>
            <FontAwesomeIcon className="text-yellow-400 px-1" icon={faCoins}/>

          </div>
        </>
      )}
    </div>
    </header>
    
  </>
  )
}

export default Header