"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// images
import ghostSvg from "@/assets/images/error.svg";

function NotFound() {
  return (
    <React.Fragment>
      <div className="account-pages my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4">
                  <div className="error-ghost text-center">
                    <Image src={ghostSvg} width={200} height={109} alt="" />
                  </div>

                  <div className="text-center">
                    <h3 className="mt-4 text-uppercase fw-bold">
                      Page not found{" "}
                    </h3>
                    <p
                      className="text-muted mb-0 mt-3"
                      style={{ lineHeight: "20px" }}
                    >
                      It&apos;s looking like you may have taken a wrong turn. Don&apos;t
                      worry... it happens to the best of us. You might want to
                      check your internet connection. Here&apos;s a little tip that
                      might help you get back on track.
                    </p>

                    <Link href="/" className="btn btn-primary mt-3">
                      <i className="mdi mdi-reply me-1"></i> Return Home
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
    </React.Fragment>
  )
}

export default NotFound