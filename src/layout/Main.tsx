import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <div className="h-[83%] overflow-y-scroll">
      <Outlet />
    </div>
  )
}

export default Main