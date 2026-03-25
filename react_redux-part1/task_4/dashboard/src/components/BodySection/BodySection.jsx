function BodySection({ title, children }) {
  return (
    <div className="bodySection" style={{ marginBottom: '1.25rem' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '2rem' }}>{title}</h2>
      {children}
    </div>
  );
}

export default BodySection;
