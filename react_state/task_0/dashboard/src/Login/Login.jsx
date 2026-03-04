function Login() {
  return (
    <div className="App-body" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', paddingLeft: '2.5rem', height: '45vh', borderTop: '4px solid #e1003c' }}>
      <p style={{ fontSize: '1.25rem' }}>Login to access the full dashboard</p>
      <div style={{ marginTop: '2rem', fontSize: '1.125rem' }}>
        <label htmlFor="email" style={{ paddingRight: '0.5rem' }}>Email:</label>
        <input type="email" id="email" name="email" style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
        <label htmlFor="password" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>Password:</label>
        <input type="password" id="password" name="password" style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
        <button style={{ cursor: 'pointer', border: '1px solid #d1d5db', padding: '0 0.25rem', borderRadius: '0.25rem', marginLeft: '0.5rem' }}>OK</button>
      </div>
    </div>
  );
}

export default Login;
