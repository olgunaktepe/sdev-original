import React from "react";
import { Metadata } from "next";
import classNames from "classnames";

// component
import  PageBreadcrumb  from "@/components/PageBreadcrumb";

// data
import { FAICONS_LIST } from "./data";

export const metadata: Metadata = {
  title: "Font Awesome",
}

const FontAwesomeIcons = () => {
  const solidIcons: any[] =
    FAICONS_LIST.data &&
    FAICONS_LIST.data.length &&
    FAICONS_LIST.data.filter((icon: any) =>
      icon.attributes.membership.free.includes("solid")
    );

  const regularIcons: any[] =
    FAICONS_LIST.data &&
    FAICONS_LIST.data.length &&
    FAICONS_LIST.data.filter((icon: any) =>
      icon.attributes.membership.free.includes("regular")
    );

  const brandsIcons: any[] =
    FAICONS_LIST.data &&
    FAICONS_LIST.data.length &&
    FAICONS_LIST.data.filter((icon: any) =>
      icon.attributes.membership.free.includes("brands")
    );

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Icons", path: "/icons/font-awesome" },
          {
            label: "Font Awesome",
            path: "/icons/font-awesome",
            active: true,
          },
        ]}
        title={"Font Awesome"}
      />
      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Solid</h4>
              <p className="sub-header">
                Use <code>&lt;i className=&quot;fas fa-ad&quot;&gt;&lt;/i&gt;</code>{" "}
                <span className="badge bg-success">v 5.13.0</span>.
              </p>

              <div className="row icons-list-demo" id="solid">
                {(solidIcons || []).map((icon, index) => {
                  return (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                      <i
                        className={classNames(
                          "fas",
                          "fa-" + icon.attributes.id
                        )}
                      ></i>
                      fas fa-{icon.attributes.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Regular</h4>
              <p className="sub-header">
                Use{" "}
                <code>&lt;i className=&quot;far fa-address-book&quot;&gt;&lt;/i&gt;</code>{" "}
                <span className="badge bg-success">v 5.13.0</span>.
              </p>

              <div className="row icons-list-demo">
                {(regularIcons || []).map((icon, index) => {
                  return (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                      <i
                        className={classNames(
                          "far",
                          "fa-" + icon.attributes.id
                        )}
                      ></i>
                      far fa-{icon.attributes.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Brands</h4>
              <p className="sub-header">
                Use <code>&lt;i className=&quot;fab fa-500px&quot;&gt;&lt;/i&gt;</code>{" "}
                <span className="badge bg-success">v 5.13.0</span>.
              </p>

              <div className="row icons-list-demo">
                {(brandsIcons || []).map((icon, index) => {
                  return (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                      <i
                        className={classNames(
                          "fab",
                          "fa-" + icon.attributes.id
                        )}
                      ></i>
                      far fa-{icon.attributes.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FontAwesomeIcons;
