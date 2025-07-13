//background-image: url('/assets/img/Hand-drawn-arrow.png');
export default function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to Our App</h1>
      <a className="btn btn-primary" href="/login">Login</a>
      <a className="btn btn-secondary ms-3" href="/signup">Signup</a>
    </div>
  )
}