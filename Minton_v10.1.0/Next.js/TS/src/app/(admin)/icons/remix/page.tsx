import React from "react";
import classNames from "classnames";
import { Metadata } from "next";

// component
import  PageBreadcrumb  from "@/components/PageBreadcrumb";

// icon data
import { REMIX_ICONS_LIST } from "./data";

export const metadata: Metadata = {
  title: "Remix Icons",
}

const RemixIcons = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Icons", path: "/icons/remix" },
          { label: "Remix Icons", path: "/icons/remix", active: true },
        ]}
        title={"Remix Icons"}
      />

      <div className="row">
        <div className="col-xs-12">
          {(REMIX_ICONS_LIST || []).map((category, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-body">
                  <h4 className="card-title">{Object.keys(category)[0]}</h4>
                  {Object.keys(category).includes("Editor") ? (
                    <>
                      <p className="card-title-desc mb-2">
                        Use <code>&lt;i className=&quot;ri-bold&quot;&gt;&lt;/i&gt;</code>
                        <span className="badge bg-success">v 2.4.1</span>.
                      </p>
                      <div className="row icons-list-demo">
                        {(
                          Object.keys(category[Object.keys(category)[0]]) || []
                        ).map((icon, index) => {
                          return (
                            <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                              <i className={classNames("ri-" + icon)}></i> ri-
                              {icon}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="card-title-desc mb-2">
                        Use{" "}
                        <code>
                          &lt;i className=&quot;ri-home-line&quot;&gt;&lt;/i&gt;
                        </code>{" "}
                        or{" "}
                        <code>
                          &lt;i className=&quot;ri-home-fill&quot;&gt;&lt;/i&gt;
                        </code>{" "}
                        <span className="badge bg-success">v 2.4.1</span>.
                      </p>
                      <div className="row icons-list-demo">
                        {(
                          Object.keys(category[Object.keys(category)[0]]) || []
                        ).map((icon, index) => {
                          return (
                            <React.Fragment key={icon + index}>
                              <div className="col-sm-6 col-lg-4 col-xl-3">
                                <i
                                  className={classNames("ri-" + icon + "-line")}
                                ></i>{" "}
                                ri-{icon}-line
                              </div>
                              <div className="col-sm-6 col-lg-4 col-xl-3">
                                <i
                                  className={classNames("ri-" + icon + "-fill")}
                                ></i>{" "}
                                ri-{icon}-fill
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RemixIcons;
