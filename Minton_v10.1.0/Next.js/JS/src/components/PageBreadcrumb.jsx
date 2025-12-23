"use client";

import React from "react";
import { Breadcrumb } from "react-bootstrap";
import classNames from "classnames";
import { useLayoutContext } from "@/context/useLayoutContext";
export async function generateMetadata(props) {
  return {
    title: props
  };
}

/**
 * PageTitle
 */
const PageBreadcrumb = ({
  title,
  breadCrumbItems
}) => {
  const {
    orientation
  } = useLayoutContext();
  generateMetadata(title);
  return <>
            <div className="row">
                <div className="col-xs-12">
                    <div suppressHydrationWarning className={classNames("page-title-box", {
          "page-title-box-alt": orientation === 'horizontal' || orientation === 'detached'
        })}>
                        <h4 className="page-title">{title}</h4>
                        <div className="page-title-right">
                            <Breadcrumb listProps={{
              className: "m-0"
            }}>
                                <Breadcrumb.Item href="/">Minton</Breadcrumb.Item>

                                {(breadCrumbItems || []).map((item, index) => {
                return item.active ? <Breadcrumb.Item active key={index}>
                                            {item.label}
                                        </Breadcrumb.Item> : <Breadcrumb.Item key={index} href={item.path}>
                                            {item.label}
                                        </Breadcrumb.Item>;
              })}

                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
        </>;
};
export default PageBreadcrumb;