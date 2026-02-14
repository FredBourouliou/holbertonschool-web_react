import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center border-b-3 border-main">
      <img src={holbertonLogo} alt="holberton logo" className="h-[200px]" />
      <h1 className="text-main ml-4 text-[2rem]">School dashboard</h1>
    </div>
  );
}

export default Header;
