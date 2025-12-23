// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import PricingCard from "@/components/PricingCard";

// dummy data
import { pricingPlans } from "../data";
export const metadata = {
  title: "Pricing"
};

// Pricing component
const Pricing = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Extra Pages",
      path: "/pages/pricing"
    }, {
      label: "Pricing",
      path: "/pages/pricing",
      active: true
    }]} title={"Pricing"} />

      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="text-center pb-2">
            <h3 className="mb-2">
              Our <span className="text-primary">Plans</span>
            </h3>
            <p className="text-muted w-50 m-auto">
              We have plans and prices that fit your business perfectly. Make
              your client site a success with our products.
            </p>
          </div>

          {/* pricing cards */}
          <PricingCard plans={pricingPlans} containerClass={"my-3"} />
        </div>
      </div>
    </>;
};
export default Pricing;