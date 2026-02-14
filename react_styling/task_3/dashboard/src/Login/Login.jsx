function Login() {
  return (
    <div className="App-body min-h-[60vh] p-4 mt-4">
      <p>Login to access the full dashboard</p>
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" className="border border-gray-300 px-2 py-1" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" className="border border-gray-300 px-2 py-1" />
        <button className="border border-gray-400 px-2 py-0.5">OK</button>
      </div>
    </div>
  );
}

export default Login;
