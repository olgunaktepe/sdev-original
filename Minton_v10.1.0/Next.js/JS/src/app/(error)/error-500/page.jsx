import React from "react";
import Link from "next/link";
import Image from "next/image";

// images
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";
export const metadata = {
  title: "Error 500"
};
const ServerError = () => {
  return <React.Fragment>
      <div className="account-pages my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4">
                  {/* logo */}
                  <div className="text-center w-75 m-auto">
                    <div className="auth-logo">
                      <Link href="/" className="logo logo-dark text-center">
                        <span className="logo-lg">
                          <Image src={logoDark} alt="" height={22} width={119} />
                        </span>
                      </Link>

                      <Link href="/" className="logo logo-light text-center">
                        <span className="logo-lg">
                        <Image src={logoLight} alt="" height={22} width={119} />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h1 className="text-error">500</h1>
                    <h3 className="mt-3 mb-2">Internal Server Error</h3>
                    <p className="text-muted mb-3">
                      Why not try refreshing your page? or you can contact{" "}
                      <Link href="" className="text-dark">
                        <b>Support</b>
                      </Link>
                    </p>

                    <Link href="/" className="btn btn-success waves-effect waves-light">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; Minton theme by{" "}
        <Link href="https://coderthemes.com/" target='_blank'>Coderthemes</Link>
      </footer>
    </React.Fragment>;
};
export default ServerError;