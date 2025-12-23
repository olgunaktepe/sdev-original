import React from "react";
import classNames from "classnames";
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// icon data
import { WEATHERICONS } from "./data";
export const metadata = {
  title: "Weather Icons"
};
const WeatherIcons = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/weather"
    }, {
      label: "Weather Icons",
      path: "/icons/weather",
      active: true
    }]} title={"Weather Icons"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">26 New 2.0 Icons</h4>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "new-icons" && <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Daytime Icons</h4>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "day-time" && <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Nighttime Icons</h4>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "night-time" && <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Neutral Icons</h4>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "neutral" && <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Miscellaneous Icons</h4>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "miscellaneous" && <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Moon Phases Icons</h4>
              <p className="alert alert-success">
                The moons are split into 28 icons, to correspond neatly with the
                28 day moon cycle. There is a primary set and alternate set. The
                primary set is meant to be interpreted as: where there are
                pixels, that is the illuminated part of the moon. The alternate
                set is meant to be interpreted as: where there are pixels, that
                is the shadowed part of the moon.
              </p>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "moon-phase" && <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Time Icons</h4>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "time" && <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Directional Arrows</h4>
              <div className="row icons-list-demo">
                {(WEATHERICONS || []).map((icon, index) => {
                return icon.category === "direction-arrows" && <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <i className={classNames("wi", "wi-" + icon.name)}></i>{" "}
                        wi wi-
                        {icon.name}
                      </div>;
              })}
              </div>

              <h4 className="header-title my-3">Utility Classes</h4>
              <p className="alert alert-success">
                Use these special, built-in utility classes to flip, rotate, or
                assign a fixed width to any icon.
              </p>

              <div className="row">
                <div className="col-sm-4">
                  <h5>Flip</h5>
                  <p>
                    <code>wi-flip-horizontal</code>
                  </p>
                  <p>
                    <code>wi-flip-vertical</code>
                  </p>
                </div>

                <div className="col-sm-4">
                  <h5>Rotate</h5>
                  <p>
                    <code>wi-rotate-90</code>
                  </p>
                  <p>
                    <code>wi-rotate-180</code>
                  </p>
                  <p>
                    <code>wi-rotate-270</code>
                  </p>
                </div>

                <div className="col-sm-4">
                  <h5>Fixed Width</h5>
                  <p>
                    <code>wi-fw</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default WeatherIcons;