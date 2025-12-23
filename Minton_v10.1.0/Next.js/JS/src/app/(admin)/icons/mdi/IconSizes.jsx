import React from "react";
import classNames from "classnames";
const IconSizes = ({
  sizeList
}) => {
  return <div className="row icons-list-demo">
      {(sizeList || []).map((size, index) => {
      return <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
            <i className={classNames("mdi", "mdi-" + size + "px", " mdi-account")}></i>{" "}
            mdi-{size}px
          </div>;
    })}
    </div>;
};
export default IconSizes;