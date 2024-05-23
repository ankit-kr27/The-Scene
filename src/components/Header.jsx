import { HomeIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/" >
          <HomeIcon />
          <span>Home</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
