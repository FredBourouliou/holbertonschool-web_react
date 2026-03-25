import { useSelector, useDispatch } from 'react-redux';
import holbertonLogo from '../../assets/holberton-logo.jpg';
import { logout } from '../../features/auth/authSlice';

function Header() {
  const { email, isLoggedIn } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="App-header" style={{ display: 'flex', alignItems: 'center', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
        <img src={holbertonLogo} alt="holberton logo" style={{ height: '15rem', pointerEvents: 'none' }} />
        <h1 style={{ fontWeight: 'bold', color: '#e1003c', fontSize: '3rem' }}>School Dashboard</h1>
      </div>
      {isLoggedIn && (
        <section id="logoutSection">
          Welcome {email} (<a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>logout</a>)
        </section>
      )}
    </>
  );
}

export default Header;
