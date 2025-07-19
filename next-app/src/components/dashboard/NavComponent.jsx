
export default function NavComponent() {
  return (
    <nav className="navbar d-lg-none">
      <div className="container-fluid">
        <button className="btn btn-outline-primary" type="button"
          data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar">
          ☰
        </button>
      </div>
    </nav>
  );
}

