import React from "react";
import classNames from "classnames";
import Image from "next/image";

// components
import  PageBreadcrumb  from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Avatars",
}

// images
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar7 from "@/assets/images/users/avatar-7.jpg";
import avatar8 from "@/assets/images/users/avatar-8.jpg";
import img1 from "@/assets/images/small/img-2.jpg";
import img2 from "@/assets/images/small/img-3.jpg";
import { Metadata } from "next";

interface RoundedCircleProps {
  size: number;
  className: string;
}

const RoundedCircle = ({ size, className }: RoundedCircleProps) => {
  return (
    <div className="col-md col-sm-6">
      <div className="mt-3">
        <Image
          src={avatar3}
          alt=""
          className={classNames(
            "img-fluid",
            "rounded-circle",
            "avatar-" + className
          )}
          height={size}
          width={size}
        />
        <p className="mb-0">
          <code>.avatar-{className} .rounded-circle</code>
        </p>
      </div>
    </div>
  );
};

const Avatars = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/avatars" },
          { label: "Avatars", path: "/ui/avatars", active: true },
        ]}
        title={"Avatars"}
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Sizing - Images</h4>
              <p className="sub-header mb-0">
                Create and group avatars of different sizes and shapes with the
                css classes. Using Bootstrap&apos;s naming convention, you can
                control size of avatar including standard avatar, or scale it up
                to different sizes.
              </p>

              <div className="row">
                <div className="col-md col-sm-6">
                  <div className="mt-3">
                    <Image
                      src={avatar2}
                      alt=""
                      className="img-fluid avatar-xs rounded"
                      height={24}
                      width={24}
                    />
                    <p className="mb-0">
                      <code>.avatar-xs</code>
                    </p>
                  </div>
                </div>
                <div className="col-md col-sm-6">
                  <div className="mt-3">
                    <Image
                      src={avatar3}
                      alt=""
                      className="img-fluid avatar-sm rounded mt-2"
                      height={36}
                      width={36}
                    />
                    <p className="mb-0">
                      <code>.avatar-sm</code>
                    </p>
                  </div>
                </div>

                <div className="col-md col-sm-6">
                  <div className="mt-3">
                    <Image
                      src={avatar4}
                      alt=""
                      className="img-fluid avatar-md rounded"
                      height={56}
                      width={56}
                    />
                    <p className="mb-0">
                      <code>.avatar-md</code>
                    </p>
                  </div>
                </div>

                <div className="col-md col-sm-6">
                  <div className="mt-3">
                    <Image
                      src={avatar5}
                      alt=""
                      className="img-fluid avatar-lg rounded"
                      height={72}
                      width={72}
                    />
                    <p className="mb-0">
                      <code>.avatar-lg</code>
                    </p>
                  </div>
                </div>

                <div className="col-md col-sm-6">
                  <div className="mt-3">
                    <Image
                      src={avatar6}
                      alt=""
                      className="img-fluid avatar-xl rounded"
                      height={96}
                      width={96}
                    />
                    <p className="mb-0">
                      <code>.avatar-xl</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Rounded Circle</h4>
              <p className="sub-header mb-0">
                Using an additional class <code>.rounded-circle</code> in{" "}
                <code>&lt;img /&gt;</code> element creates the rounded avatar.
              </p>

              <div className="row">
                {[{ size: 24, class: "xs" }, { size: 36, class: "sm" }, { size: 56, class: "md" }, { size: 72, class: "lg" }, { size: 96, class: "xl" }].map((size, index) => {
                  return <RoundedCircle key={index} size={size.size} className={size.class} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Sizing - Background Color</h4>
              <p className="sub-header mb-0">
                Using utilities classes of background e.g. <code>bg-*</code>{" "}
                allows you to have any background color as well.
              </p>

              <div className="row">
                <div className="col-md-3 col-sm-6">
                  <div className="mt-3">
                    <div className="avatar-xs">
                      <span className="avatar-title bg-primary rounded">
                        xs
                      </span>
                    </div>
                    <p className="mb-2 font-14 mt-1">
                      Using <code>.avatar-xs</code>
                    </p>

                    <div className="avatar-sm mt-3">
                      <span className="avatar-title bg-success rounded">
                        sm
                      </span>
                    </div>

                    <p className="mb-0 font-14 mt-1">
                      Using <code>.avatar-sm</code>
                    </p>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6">
                  <div className="mt-3">
                    <div className="avatar-md">
                      <span className="avatar-title bg-soft-info text-info font-20 rounded">
                        MD
                      </span>
                    </div>

                    <p className="mb-0 font-14 mt-1">
                      Using <code>.avatar-md</code>
                    </p>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6">
                  <div className="mt-3">
                    <div className="avatar-lg">
                      <span className="avatar-title bg-danger font-22 rounded">
                        LG
                      </span>
                    </div>

                    <p className="mb-0 font-14 mt-1">
                      Using <code>.avatar-lg</code>
                    </p>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6">
                  <div className="mt-3">
                    <div className="avatar-xl">
                      <span className="avatar-title bg-soft-warning text-warning font-24 rounded">
                        XL
                      </span>
                    </div>

                    <p className="mb-0 font-14 mt-1">
                      Using <code>.avatar-xl</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Rounded Circle Background</h4>
              <p className="sub-header mb-0">
                Using an additional class <code>.rounded-circle</code> in{" "}
                <code>&lt;img /&gt;</code> element creates the rounded avatar.
              </p>

              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="mt-3">
                    <div className="avatar-md">
                      <span className="avatar-title bg-soft-secondary text-secondary font-20 rounded-circle">
                        MD
                      </span>
                    </div>

                    <p className="mb-0 font-14 mt-1">
                      Using <code>.avatar-md .rounded-circle</code>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="mt-3">
                    <div className="avatar-lg">
                      <span className="avatar-title bg-light text-dark font-22 rounded-circle">
                        LG
                      </span>
                    </div>

                    <p className="mb-0 font-14 mt-1">
                      Using <code>.avatar-lg .rounded-circle</code>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="mt-3">
                    <div className="avatar-xl">
                      <span className="avatar-title bg-soft-primary text-primary font-24 rounded-circle">
                        XL
                      </span>
                    </div>

                    <p className="mb-0 font-14 mt-1">
                      Using <code>.avatar-xl .rounded-circle</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Images Shapes</h4>
              <p className="sub-header">
                Avatars with different sizes and shapes.
              </p>

              <div className="row">
                <div className="col-sm-2">
                  <Image
                    src={img1}
                    alt=""
                    className="img-fluid rounded"
                    width={200}
                    height={133}
                  />
                  <p className="mb-0">
                    <code>.rounded</code>
                  </p>
                </div>

                <div className="col-sm-2 text-center">
                  <Image
                    src={avatar5}
                    alt=""
                    className="img-fluid rounded"
                    width={120}
                    height={120}
                  />
                  <p className="mb-0">
                    <code>.rounded</code>
                  </p>
                </div>

                <div className="col-sm-2 text-center">
                  <Image
                    src={avatar7}
                    alt=""
                    className="img-fluid rounded-circle"
                    width={120}
                    height={120}
                  />
                  <p className="mb-0">
                    <code>.rounded-circle</code>
                  </p>
                </div>

                <div className="col-sm-2">
                  <Image
                    src={img2}
                    alt=""
                    className="img-fluid img-thumbnail"
                    width={200}
                    height={136}
                  />
                  <p className="mb-0">
                    <code>.img-thumbnail</code>
                  </p>
                </div>

                <div className="col-sm-2">
                  <Image
                    src={avatar8}
                    alt=""
                    className="img-fluid rounded-circle img-thumbnail"
                    width={120}
                    height={120}
                  />
                  <p className="mb-0">
                    <code>.rounded-circle .img-thumbnail</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avatars;
