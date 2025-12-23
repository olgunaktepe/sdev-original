import React from "react";
// images
import LogoDark from "@/assets/images/logo-dark.png";
import LogoLight from "@/assets/images/logo-light.png";
import Link from "next/link";
import Image from "next/image";
const AuthLayout = ({
  helpText,
  bottomLinks,
  children,
  isCombineForm
}) => {
  return <>
      <div className="account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className={`col-md-8 col-lg-6 col-xl-${isCombineForm ? 9 : 4}`}>
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto">
                    <div className="auth-logo">
                      <Link href="/" className="logo logo-dark text-center">
                        <span className="logo-lg">
                          <Image src={LogoDark} alt="logo" height={22} width={119} />
                        </span>
                      </Link>

                      <Link href="/" className="logo logo-light text-center">
                        <span className="logo-lg">
                          <Image src={LogoLight} alt="logo" height={22} width={119} />
                        </span>
                      </Link>
                    </div>
                    {helpText && <p className="text-muted mb-4 mt-3">{helpText}</p>}
                  </div>
                  {children}
                </div>
              </div>

              {/* bottom links */}
              {bottomLinks}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; Minton theme by{" "}
        <Link href="https://coderthemes.com/" className="text-dark" target="_blank">
          Coderthemes
        </Link>
      </footer>
    </>;
};
export default AuthLayout;