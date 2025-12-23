import React from "react";
import classNames from "classnames";
const PricingCard = ({
  plans,
  containerClass,
  pricingCardClass
}) => {
  return <>
      <div className={`row ${containerClass}`}>
        {(plans || []).map((plan, idx) => {
        return <div className="col-xl-3 col-md-6" key={idx}>
              <div className={classNames("card-pricing", "card", {
            "ribbon-box": plan.isPopular
          }, pricingCardClass)}>
                {plan.isPopular && <div className="ribbon-two ribbon-two-danger">
                    <span>Popular</span>
                  </div>}

                <div className="card-body text-center">
                  <p className="card-pricing-plan-name fw-bold text-uppercase">
                    {plan.name}
                  </p>
                  <span className={classNames("card-pricing-icon", plan.isPopular ? "text-white bg-danger" : "text-primary")}>
                    <i className={plan.icon}></i>
                  </span>
                  <h2 className="card-pricing-price">
                    ${plan.price} <span>/ {plan.duration}</span>
                  </h2>
                  <ul className="card-pricing-features">
                    {(plan.features || []).map((feature, idx1) => {
                  return <li key={idx1}>{feature}</li>;
                })}
                  </ul>
                  <div className="d-grid">
                    <button className={classNames("btn", "waves-effect", "waves-light", "mt-4", plan.isPopular ? "btn-danger" : "btn-primary")}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>;
      })}
      </div>
    </>;
};
export default PricingCard;