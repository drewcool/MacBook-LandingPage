
import { navLinks } from '../constants'

const NavBar = () => {
  return (
    <header>
      <nav className='p-5'>
        <img src="logo.svg" alt="Apple Logo" />
        <ul className='flex-center gap-5'>
          {navLinks.map(({label , href}) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className='flex-center gap-3'>
          <button>
            <img src="/search.svg" alt="Search" />
          </button>
          <button>
            <img src="/cart.svg" alt="Cart" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default NavBar