import BodySection from './BodySection';

function BodySectionWithMarginBottom(props) {
  return (
    <div className="bodySectionWithMargin mb-10">
      <BodySection {...props} />
    </div>
  );
}

export default BodySectionWithMarginBottom;
