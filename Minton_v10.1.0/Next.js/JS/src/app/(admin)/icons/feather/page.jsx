import React from "react";
import classNames from "classnames";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// icon data
import { FEATHERICONLIST } from "./data";
export const metadata = {
  title: "Feather Icons"
};
const FeatherIcons = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/feather"
    }, {
      label: "Feather Icons",
      path: "/icons/feather",
      active: true
    }]} title={"Feather Icons"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <div className="row icons-list-demo">
                {(FEATHERICONLIST || []).map((icon, index) => {
                return <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
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
export default FeatherIcons;