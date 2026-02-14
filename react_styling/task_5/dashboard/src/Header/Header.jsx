import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center border-b-3 border-main max-[912px]:flex-col max-[912px]:items-center">
      <img src={holbertonLogo} alt="holberton logo" className="h-[200px] max-[520px]:h-[150px]" />
      <h1 className="text-main ml-4 text-3xl max-[520px]:text-xl max-[912px]:ml-0">School dashboard</h1>
    </div>
  );
}

export default Header;
