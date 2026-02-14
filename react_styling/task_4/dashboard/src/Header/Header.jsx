import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center py-2 max-[520px]:flex-col">
      <img src={holbertonLogo} alt="holberton logo" className="h-60 pointer-events-none max-[520px]:h-60" />
      <h1 className="font-bold text-main text-5xl max-[520px]:text-5xl max-[520px]:mt-2 max-[435px]:text-4xl">School Dashboard</h1>
    </div>
  );
}

export default Header;
