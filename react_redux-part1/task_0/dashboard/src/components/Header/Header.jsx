import holbertonLogo from '../../assets/holberton-logo.jpg';

function Header({ user, logOut }) {
  return (
    <>
      <div className="App-header" style={{ display: 'flex', alignItems: 'center', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
        <img src={holbertonLogo} alt="holberton logo" style={{ height: '15rem', pointerEvents: 'none' }} />
        <h1 style={{ fontWeight: 'bold', color: '#e1003c', fontSize: '3rem' }}>School Dashboard</h1>
      </div>
      {user && user.isLoggedIn && (
        <section id="logoutSection">
          Welcome {user.email} (<a href="#" onClick={(e) => { e.preventDefault(); logOut(); }}>logout</a>)
        </section>
      )}
    </>
  );
}

export default Header;
