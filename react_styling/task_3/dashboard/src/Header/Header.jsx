import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center py-2">
      <img src={holbertonLogo} alt="holberton logo" className="h-60 pointer-events-none" />
      <h1 className="font-bold text-main text-5xl">School Dashboard</h1>
    </div>
  );
}

export default Header;
