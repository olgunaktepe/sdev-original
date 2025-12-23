import React from "react";
import { Col, Row } from "react-bootstrap";
import classNames from "classnames";

interface RotateIconProps {
  icons: number[];
}

const RotateIcons = ({ icons }: RotateIconProps) => {
  return (
    <div className="row icons-list-demo">
      {(icons || []).map((icon, index) => {
        return (
          <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
            <i
              className={classNames(
                "mdi",
                "mdi-rotate-" + icon,
                " mdi-account"
              )}
            ></i>{" "}
            mdi-rotate-{icon}
          </div>
        );
      })}
    </div>
  );
};

export default RotateIcons;
