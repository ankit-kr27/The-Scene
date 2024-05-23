import { Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"

const App = () => {
  return (
      <div className="flex sm:h-screen flex-col sm:flex-row p-4 justify-between">
          <Header className="fixed left-0 right-0 top-0 z-10" />
          <div className="flex-1 overflow-auto w-full">
              <Outlet />
          </div>
      </div>
  );
}

export default App
