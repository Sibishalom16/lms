export default function HomePage() {
  return (
    <div>
<nav className="navbar">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/login">Login</a></li>
  </ul>
</nav>

      <section className="home">
        <h1>Welcome to LMS</h1>
        <p>Your learning starts here 🚀</p>
        <button className="btn">Get Started</button>
      </section>
    </div>
  );
}
