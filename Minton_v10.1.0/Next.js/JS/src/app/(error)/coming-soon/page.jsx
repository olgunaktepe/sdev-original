import React from "react";
import Link from "next/link";
import Image from "next/image";
import Counter from "@/app/(error)/coming-soon/Counter";

// images
import rocketGif from "@/assets/images/animat-rocket-color.gif";
export const metadata = {
  title: "Coming Soon"
};
const ComingSoon = () => {
  return <>
      <div className="my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="text-center">
                <Image src={rocketGif} alt="" height={160} width={160} />

                <h3 className="mt-4">Stay tunned, we&apos;re launching very soon</h3>
                <p className="text-muted">
                  We&apos;re making the system more awesome.
                </p>

                <div className="row mt-5 justify-content-center">
                  <div className="col-md-8">
                    <Counter />
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
    </>;
};
export default ComingSoon;