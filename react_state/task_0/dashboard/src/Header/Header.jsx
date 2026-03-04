import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header" style={{ display: 'flex', alignItems: 'center', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
      <img src={holbertonLogo} alt="holberton logo" style={{ height: '15rem', pointerEvents: 'none' }} />
      <h1 style={{ fontWeight: 'bold', color: '#e1003c', fontSize: '3rem' }}>School Dashboard</h1>
    </div>
  );
}

export default Header;
