import React from "react";
import Link from "next/link";
import classNames from "classnames";
const AnalyticDropdown = dynamic(() => import('./AnalyticDropdown'));

// types

import dynamic from "next/dynamic";
const TrafficSources = ({
  trafficSources
}) => {
  return <div className="card">
      <div className="card-body">
        <AnalyticDropdown />

        <h4 className="header-title mt-0 mb-3">Traffic Sources</h4>

        <div className="table-responsive browser_users">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-top-0">Channel</th>
                <th className="border-top-0">Sessions</th>
                <th className="border-top-0">Prev.Period</th>
                <th className="border-top-0">% Change</th>
              </tr>
            </thead>
            <tbody>
              {(trafficSources || []).map((item, index) => {
              return <tr key={index}>
                    <td>
                      <Link href="" className="text-primary">
                        {item.channel}
                      </Link>
                    </td>
                    <td>
                      {item.sessions.value}{" "}
                      <small className="text-muted">
                        ({item.sessions.rate})
                      </small>
                    </td>
                    <td>
                      {item.previewPeriod.value}{" "}
                      <small className="text-muted">
                        ({item.previewPeriod.rate})
                      </small>
                    </td>
                    <td>
                      {" "}
                      {item.change.value}{" "}
                      <i className={classNames("fas", "fa-caret-" + item.change.direction, "font-16", item.change.direction === "up" ? "text-success" : "text-danger")}></i>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default TrafficSources;