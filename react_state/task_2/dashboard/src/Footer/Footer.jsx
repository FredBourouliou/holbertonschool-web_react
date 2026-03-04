import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '4px solid #e1003c', height: '4rem', marginTop: 'auto' }}>
      <p style={{ fontStyle: 'italic', fontSize: '1.25rem' }}>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </div>
  );
}

export default Footer;
