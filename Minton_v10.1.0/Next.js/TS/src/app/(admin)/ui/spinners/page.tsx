import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const ButtonSpinners = dynamic(() => import('./ButtonSpinners'))
import Spinner from "@/components/Spinner";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

const colors: string[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
  "blue",
  "pink",
];

const BorderedSpinners = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Border spinner</h4>
        <p className="sub-header">
          Use the border spinners for a lightweight loading indicator.
        </p>
        <Spinner type="bordered" className="m-2" color="primary" />
      </div>
    </div>
  );
};

const GrowingSpinners = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Growing spinner</h4>
        <p className="sub-header">
          If you don’t fancy a border spinner, switch to the grow spinner. While
          it doesn’t technically spin, it does repeatedly grow!
        </p>
        <Spinner type="grow" color="success" />
      </div>
    </div>
  );
};

const Colors = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Colors</h4>
        <p className="sub-header">
          All standard visual variants are available for both animation styles
          by setting the <code>variant</code> property.
        </p>

        {(colors || []).map((color, index) => {
          return <Spinner key={index} type="bordered" className="m-2" color={color} />;
        })}
      </div>
    </div>
  );
};

const ColorGrowingSpinners = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Color Growing spinner</h4>
        <p className="sub-header">
          Here it is in blue, along with the supported variants.
        </p>
        {(colors || []).map((color, index) => {
          return (
            <Spinner key={index} className="m-2" type="grow" color={color} />
          );
        })}
      </div>
    </div>
  );
};

const AlignmentSpinners = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="header-title">Alignment</h4>
          <p className="sub-header">
            Use flexbox utilities, float utilities, or text alignment utilities
            to place spinners exactly where you need them in any situation.
          </p>
          <div className="d-flex justify-content-center">
            <Spinner type="bordered"/>
          </div>
        </div>
      </div>
    </>
  );
};

const SpinnerPlacements = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="header-title">Placement</h4>
          <p className="sub-header">
            Use <code>flexbox utilities</code>, <code>float utilities</code>, or{" "}
            <code>text alignment</code> utilities to place spinners exactly
            where you need them in any situation.
          </p>
          <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <Spinner type="bordered" className="ms-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

const SpinnersSizes = () => {
  const sizes: ("lg" | "md" | "sm")[] = ["lg", "md", "sm"];

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Size</h4>
        <p className="sub-header">
          Add <code>size</code> attribute to make spinner with sizes including
          lg, md or sm.
        </p>
        <div className="row">
          {(sizes || []).map((size, index) => {
            return (
              <div key={index} className="col-lg-6">
                <Spinner type="bordered"
                  className="text-primary m-2"
                  color="primary"
                  size={size}
                />
                <Spinner
                  className="text-secondary m-2"
                  type="grow"
                  size={size}
                />
              </div>
            );
          })}
          <div className="col-lg-6">
            <Spinner type="bordered" className="spinner-border-sm m-2" />
            <Spinner type="grow" className="spinner-grow-sm m-2" />
          </div>
        </div>
      </div>
    </div>
  );
};


export const metadata: Metadata = {
  title: "Spinners"
}

const Spinners = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/spinners" },
          { label: "Spinners", path: "/ui/spinners", active: true },
        ]}
        title={"Spinners"}
      />

      <div className="row">
        <div className="col-lg-6">
          <BorderedSpinners />
        </div>
        <div className="col-lg-6">
          <GrowingSpinners />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <Colors />
        </div>

        <div className="col-lg-6">
          <ColorGrowingSpinners />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <AlignmentSpinners />
        </div>
        <div className="col-lg-6">
          <SpinnerPlacements />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <SpinnersSizes />
        </div>
        <div className="col-lg-6">
          <ButtonSpinners />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Spinners;
