import React from "react";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames";

interface IconSizeProps {
  sizeList: number[];
}

const IconSizes = ({ sizeList }: IconSizeProps) => {
  return (
    <div className="row icons-list-demo">
      {(sizeList || []).map((size, index) => {
        return (
          <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
            <i
              className={classNames(
                "mdi",
                "mdi-" + size + "px",
                " mdi-account"
              )}
            ></i>{" "}
            mdi-{size}px
          </div>
        );
      })}
    </div>
  );
};

export default IconSizes;
