import logo from '../assets/imgs/interface2.png'

const Footer = () => {
  return (
    <div className="p-4 text-center footer">
      <a className="navbar-brand title " href="#">Healt<img className='logo' src={logo} alt="logo" />FitnessPro</a>

      <p className="mb-0 text-light">
        &copy; {new Date().getFullYear()} | Developed by{" "}
        <a
          href="https://lablancadev.github.io/My-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-info"
        >
          David Risueño Lablanca
        </a>
      </p>

    </div>
  )
}

export default Footer