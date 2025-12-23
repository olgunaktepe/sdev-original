import React from "react";
import classNames from "classnames";

// icon data type

const AllIcons = ({
  icons
}) => {
  return <div className="row icon-list-demo">
      {(icons || []).map((icon, index) => {
      return <div key={index} className="col-sm-6 col-md-4 col-lg-3">
            <i className={classNames("mdi", "mdi-" + icon.name)}></i>
            <span>mdi-{icon.name}</span>
          </div>;
    })}
    </div>;
};
export default AllIcons;