import React from "react";
import PopoverDirection from "./PopoverDirection";
import TooltipDirection from "./TooltipsDirections";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Tooltips & Popovers"
};
const TooltipsPopovers = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/tooltips-popovers"
    }, {
      label: "Tooltips & Popovers",
      path: "/ui/tooltips-popovers",
      active: true
    }]} title={"Tooltips & Popovers"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <PopoverDirection />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <TooltipDirection />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>;
};
export default TooltipsPopovers;