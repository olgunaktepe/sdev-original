import React from "react";
import classNames from "classnames";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Ribbons"
};
const Ribbon1 = ({
  label,
  color,
  direction
}) => {
  return <div className="card ribbon-box">
      <div className="card-body">
        <div className={classNames("ribbon", "ribbon-" + color, direction === "left" ? "float-start" : "float-end")}>
          <i className="mdi mdi-access-point me-1"></i> {label}
        </div>
        <h5 className={classNames("text-" + color, "mt-0", direction === "left" ? "float-end" : "float-start")}>
          {label} Header
        </h5>
        <div className="ribbon-content">
          <p className="mb-0">
            Quisque nec turpis at urna dictum luctus. Suspendisse convallis
            dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
            dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
            dapibus odio.
          </p>
        </div>
      </div>
    </div>;
};
const Ribbon2 = ({
  label,
  color
}) => {
  return <div className="card ribbon-box">
      <div className="card-body">
        <div className={classNames("ribbon-two", "ribbon-two-" + color)}>
          <span>{label}</span>
        </div>
        <p className="mb-0">
          Quisque nec turpis at urna dictum luctus. Suspendisse convallis
          dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
          dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
          dapibus odio. Vivamus pretium nec odio cursus elementum. Suspendisse
          molestie ullamcorper ornare.
        </p>
      </div>
    </div>;
};
const Ribbon3 = ({
  label,
  color,
  direction
}) => {
  return <div className="card ribbon-box">
      <div className="card-body">
        <div className={classNames("ribbon", "ribbon-shape", "ribbon-" + color, direction === "left" ? "float-start" : "float-end")}>
          {label}
        </div>
        <h5 className={classNames("text-" + color, "mt-0", direction === "left" ? "float-end" : "float-start")}>
          {label} Header
        </h5>

        <div className="ribbon-content">
          <p className="mb-0">
            Quisque nec turpis at urna dictum luctus. Suspendisse convallis
            dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
            dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
            dapibus odio.
          </p>
        </div>
      </div>
    </div>;
};
const Ribbons = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/ribbons"
    }, {
      label: "Ribbons",
      path: "/ui/ribbons",
      active: true
    }]} title={"Ribbons"} />

      <div className="row">
        <div className="col-lg-4">
          <Ribbon1 label="Purple" color="purple" direction="left" />
        </div>
        <div className="col-lg-4">
          <Ribbon1 label="Primary" color="primary" direction="right" />
        </div>
        <div className="col-lg-4">
          <Ribbon1 label="Success" color="success" direction="right" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <Ribbon1 label="Info" color="info" direction="left" />
        </div>
        <div className="col-lg-4">
          <Ribbon1 label="Warning" color="warning" direction="right" />
        </div>
        <div className="col-lg-4">
          <Ribbon1 label="Danger" color="danger" direction="right" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <Ribbon3 label="Pink" color="pink" direction="left" />
        </div>
        <div className="col-lg-4">
          <Ribbon3 label="Secondary" color="secondary" direction="right" />
        </div>
        <div className="col-lg-4">
          <Ribbon3 label="Dark" color="dark" direction="right" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <Ribbon2 label="Secondary" color="secondary" />
        </div>
        <div className="col-lg-4">
          <Ribbon2 label="Primary" color="primary" />
        </div>
        <div className="col-lg-4">
          <Ribbon2 label="Success" color="success" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <Ribbon2 label="Info" color="info" />
        </div>
        <div className="col-lg-4">
          <Ribbon2 label="Warning" color="warning" />
        </div>
        <div className="col-lg-4">
          <Ribbon2 label="Danger" color="danger" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <Ribbon2 label="Pink" color="pink" />
        </div>
        <div className="col-lg-4">
          <Ribbon2 label="Purple" color="purple" />
        </div>
        <div className="col-lg-4">
          <Ribbon2 label="Dark" color="dark" />
        </div>
      </div>
    </React.Fragment>;
};
export default Ribbons;