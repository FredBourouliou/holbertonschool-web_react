import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer border-t-3 border-main text-center italic p-4 mt-auto max-[520px]:text-sm">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </div>
  );
}

export default Footer;
