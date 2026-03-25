import { getCurrentYear, getFooterCopy } from '../../utils/utils';

function Footer({ user }) {
  return (
    <div className="App-footer" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '4px solid #e1003c', height: '4rem', marginTop: 'auto' }}>
      <p style={{ fontStyle: 'italic', fontSize: '1.25rem', margin: 0 }}>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user && user.isLoggedIn && (
        <p><a href="#">Contact us</a></p>
      )}
    </div>
  );
}

export default Footer;
