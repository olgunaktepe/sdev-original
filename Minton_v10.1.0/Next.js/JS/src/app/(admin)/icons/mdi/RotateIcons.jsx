import React from "react";
import classNames from "classnames";
const RotateIcons = ({
  icons
}) => {
  return <div className="row icons-list-demo">
      {(icons || []).map((icon, index) => {
      return <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
            <i className={classNames("mdi", "mdi-rotate-" + icon, " mdi-account")}></i>{" "}
            mdi-rotate-{icon}
          </div>;
    })}
    </div>;
};
export default RotateIcons;