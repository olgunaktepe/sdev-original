import { Metadata } from "next";
import Link from "next/link";
import React from "react";

const Error404Svg = () => {
  return (
    <svg viewBox="0 0 600 200">
      <symbol id="s-text">
        <text textAnchor="middle" x="50%" y="50%" dy=".35em">
          404!
        </text>
      </symbol>
      <use className="text" href="#s-text"></use>
      <use className="text" href="#s-text"></use>
      <use className="text" href="#s-text"></use>
      <use className="text" href="#s-text"></use>
      <use className="text" href="#s-text"></use>
    </svg>
  );
};
export const metadata: Metadata = {
  title: "Error 404 Alt",
}

const Error404Alt = () => {
  return (
    <>
      <div className="row justify-content-center my-5">
        <div className="col-lg-6 col-xl-4 mb-4">
          <div className="error-text-box">
            <Error404Svg />
          </div>

          <div className="text-center">
            <h3 className="mt-0 mb-2">Whoops! Page not found </h3>
            <p className="text-muted mb-3">
              It&apos;s looking like you may have taken a wrong turn. Don&apos;t worry...
              it happens to the best of us. You might want to check your
              internet connection. Here&apos;s a little tip that might help you get
              back on track.
            </p>
            <Link href="/" className="btn btn-success waves-effect waves-light">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404Alt;
