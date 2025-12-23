import React from "react";
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SimpleEditor from "@/app/(admin)/forms/editors/SimpleEditor";
export const metadata = {
  title: "Editors"
};
const Editors = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Forms",
      path: "/forms/editors"
    }, {
      label: "Editors",
      path: "/forms/editors",
      active: true
    }]} title={"Editors"} />

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">SimpleMDE</h4>
              <p className="sub-header">
                {" "}
                SimpleMDE is a light-weight, simple, embeddable, and beautiful
                JS markdown editor
              </p>

              <SimpleEditor />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>;
};
export default Editors;