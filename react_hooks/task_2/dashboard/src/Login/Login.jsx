import { useState } from 'react';

function Login({ logIn }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  function handleChangeEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData((prev) => ({ ...prev, email }));
    setEnableSubmit(emailRegex.test(email) && formData.password.length >= 8);
  }

  function handleChangePassword(e) {
    const password = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData((prev) => ({ ...prev, password }));
    setEnableSubmit(emailRegex.test(formData.email) && password.length >= 8);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (logIn) {
      logIn(formData.email, formData.password);
    }
  }

  return (
    <div className="App-body" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', paddingLeft: '2.5rem', height: '45vh', borderTop: '4px solid #e1003c' }}>
      <p style={{ fontSize: '1.25rem' }}>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit} style={{ marginTop: '2rem', fontSize: '1.125rem' }}>
        <label htmlFor="email" style={{ paddingRight: '0.5rem' }}>Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChangeEmail} style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
        <label htmlFor="password" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChangePassword} style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
        <input type="submit" value="OK" disabled={!enableSubmit} style={{ cursor: enableSubmit ? 'pointer' : 'not-allowed', border: '1px solid #d1d5db', padding: '0 0.25rem', borderRadius: '0.25rem', marginLeft: '0.5rem' }} />
      </form>
    </div>
  );
}

export default Login;
