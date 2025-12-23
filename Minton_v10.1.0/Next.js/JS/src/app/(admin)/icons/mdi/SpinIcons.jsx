import React from "react";
import classNames from "classnames";
const SpinIcons = ({
  icons
}) => {
  return <div className="row icons-list-demo">
      {(icons || []).map((icon, index) => {
      return <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
            <i className={classNames("mdi", "mdi-spin", "mdi-" + icon)}></i>{" "}
            mdi-spin
          </div>;
    })}
    </div>;
};
export default SpinIcons;