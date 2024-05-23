import { HomeIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"

const Header = () => {
  return (
      <header className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex items-center justify-between">
              <Link to="/" className="flex items-center">
                  <HomeIcon className="mr-2 h-6 w-6" />
                  <span className="text-xl font-bold">Home</span>
              </Link>
          </div>
      </header>
  );
}

export default Header
