import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import classNames from "classnames";

// dummy data
import { maintenanceQuery } from "../../(admin)/pages/data";

// images
import maintenanceGif from "@/assets/images/animat-diamond-color.gif";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Maintenance",
}

const Maintenance = () => {
  return (
    <>
      <div className="mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="text-center">
                <Image src={maintenanceGif} alt="" height={160} width={160} />
                <h3 className="mt-1">
                  We are currently performing maintenance
                </h3>
                <p className="text-muted">
                  We&apos;re making the system more awesome. We&apos;ll be back shortly.
                </p>

                <div className="row mt-5">
                  {(maintenanceQuery || []).map((item, index) => {
                    return (
                      <div className="col-md-4" key={index}>
                        <div className="text-center mt-3 px-1">
                          <div className="avatar-md rounded-circle bg-soft-primary mx-auto">
                            <i
                              className={classNames(
                                item.icon,
                                "font-22",
                                "avatar-title",
                                " text-primary"
                              )}
                            ></i>
                          </div>
                          <h5 className="font-16 mt-3">{item.title}</h5>
                          <p className="text-muted">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; Minton theme by{" "}
        <Link href="https://coderthemes.com/" target="_blank">Coderthemes</Link>
      </footer>
    </>
  );
};

export default Maintenance;
