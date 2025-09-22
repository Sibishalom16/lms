export default function LoginPage() {
  return (
    <div>
 <nav className="navbar">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/login">Login</a></li>
  </ul>
</nav>

      <div className="login-container">
        <form className="login-box">
          <h2>Login</h2>

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}
