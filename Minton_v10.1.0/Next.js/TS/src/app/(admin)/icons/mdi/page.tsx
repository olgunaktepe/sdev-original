import React from "react";
import { Metadata } from "next";

// component
import  PageBreadcrumb  from "@/components/PageBreadcrumb";

import AllIcons from "./AllIcons";
import IconSizes from "./IconSizes";
import NewIcons from "./NewIcons";
import RotateIcons from "./RotateIcons";
import SpinIcons from "./SpinIcons";

// icon data
import {
  MDIICONS_LIST,
  ICONSIZE_LIST,
  ROTATEICON_LIST,
  SPINICON_LIST,
  MdiIconType,
} from "./data";

export const metadata: Metadata = {
  title: "Material Design Icons",
}

const MDIIcons = () => {
  const newIcons: MdiIconType[] =
    MDIICONS_LIST && MDIICONS_LIST.filter((icon) => icon.version === "5.8.55");

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Icons", path: "/icons/mdi" },
          { label: "Material Design", path: "/icons/mdi", active: true },
        ]}
        title={"Material Design"}
      />

      <div className="row icons-list-demo">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-4">New Icons v5.8.55</h4>
              <NewIcons icons={newIcons} />
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-4">All Icons</h4>
              <AllIcons icons={MDIICONS_LIST} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-4">Size</h4>
              <IconSizes sizeList={ICONSIZE_LIST} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-4">Rotate</h4>
              <RotateIcons icons={ROTATEICON_LIST} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-4">Spin</h4>
              <SpinIcons icons={SPINICON_LIST} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MDIIcons;
