import React from "react";
import classNames from "classnames";
// component
import PageBreadcrumb from "@/components/PageBreadcrumb";

// icon data
import { REGULAR_ICONS, SOLID_ICONS, LOGO_ICONS } from "./data";
export const metadata = {
  title: "Boxicons"
};
const BoxIcons = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/boxicons"
    }, {
      label: "Boxicons",
      path: "/icons/boxicons",
      active: true
    }]} title={"Boxicons"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Examples</h4>
              <p className="sub-header">
                Use class <code>&lt;i class=&quot;bx bx-**&quot;&gt;&lt;/i&gt;</code>
              </p>

              <h5>Regular</h5>

              <div className="row icons-list-demo">
                {(REGULAR_ICONS || []).map((icon, index) => {
                return <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                      <i className={classNames(icon.name)}></i> {icon.name}
                    </div>;
              })}
              </div>

              <h5 className="mt-5">Solid Icons</h5>

              <div className="row icons-list-demo">
                {(SOLID_ICONS || []).map((icon, index) => {
                return <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
                      <i className={classNames(icon.name)}></i> {icon.name}
                    </div>;
              })}
              </div>

              <h5 className="mt-5">Logos</h5>

              <div className="row icons-list-demo">
                {(LOGO_ICONS || []).map((icon, index) => {
                return <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
                      <i className={classNames(icon.name)}></i> {icon.name}
                    </div>;
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default BoxIcons;