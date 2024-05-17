export default function Footer() {
  return (
    <div className="footer-container">
      <div className="row">
        <div className="col">
          <p className="footer-text">
            &copy; 2024 Movflix. All rights reserved.
          </p>
          <p className="footer-text">
            Developed By{" "}
            <a
              href="http://sunny.is-a.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
            >
              @Sunny
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
