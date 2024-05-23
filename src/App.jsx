import { Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"

const App = () => {
  return (
    <div className="p-4">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
