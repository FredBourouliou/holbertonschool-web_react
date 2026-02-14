function BodySection({ title, children }) {
  return (
    <div className="bodySection p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

export default BodySection;
