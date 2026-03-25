import { useState } from 'react';

function useLogin(onLogin) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChangeEmail(e) {
    const email = e.target.value;
    setFormData((prev) => ({ ...prev, email }));
    setEnableSubmit(emailRegex.test(email) && formData.password.length >= 8);
  }

  function handleChangePassword(e) {
    const password = e.target.value;
    setFormData((prev) => ({ ...prev, password }));
    setEnableSubmit(emailRegex.test(formData.email) && password.length >= 8);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (onLogin) {
      onLogin(formData.email, formData.password);
    }
  }

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;
