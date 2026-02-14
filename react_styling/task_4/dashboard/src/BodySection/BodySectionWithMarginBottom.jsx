import BodySection from './BodySection';

function BodySectionWithMarginBottom(props) {
  return (
    <div className="bodySectionWithMargin mb-10 max-w-full">
      <BodySection {...props} />
    </div>
  );
}

export default BodySectionWithMarginBottom;
