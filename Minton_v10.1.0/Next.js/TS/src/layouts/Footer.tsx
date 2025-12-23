import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            2015 - {new Date().getFullYear()} &copy; Minton - Coderthemes.com
          </div>
          <div className="col-md-6">
            <div className="text-md-end footer-links d-none d-md-block">
              <Link href="">About</Link>
              <Link href="">Support</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
