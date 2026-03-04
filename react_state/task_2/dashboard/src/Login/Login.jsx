import { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email || '',
      password: props.password || '',
      enableSubmit: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { logIn } = this.props;
    const { email, password } = this.state;
    if (logIn) {
      logIn(email, password);
    }
  }

  handleChangeEmail(e) {
    const email = e.target.value;
    this.setState({ email }, () => {
      this.updateEnableSubmit();
    });
  }

  handleChangePassword(e) {
    const password = e.target.value;
    this.setState({ password }, () => {
      this.updateEnableSubmit();
    });
  }

  updateEnableSubmit() {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enableSubmit = emailRegex.test(email) && password.length >= 8;
    this.setState({ enableSubmit });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', paddingLeft: '2.5rem', height: '45vh', borderTop: '4px solid #e1003c' }}>
        <p style={{ fontSize: '1.25rem' }}>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit} style={{ marginTop: '2rem', fontSize: '1.125rem' }}>
          <label htmlFor="email" style={{ paddingRight: '0.5rem' }}>Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={this.handleChangeEmail} style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
          <label htmlFor="password" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={this.handleChangePassword} style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
          <input type="submit" value="OK" disabled={!enableSubmit} style={{ cursor: enableSubmit ? 'pointer' : 'not-allowed', border: '1px solid #d1d5db', padding: '0 0.25rem', borderRadius: '0.25rem', marginLeft: '0.5rem' }} />
        </form>
      </div>
    );
  }
}

export default Login;
