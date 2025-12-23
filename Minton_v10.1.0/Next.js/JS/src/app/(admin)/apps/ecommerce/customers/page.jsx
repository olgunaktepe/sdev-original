import dynamic from "next/dynamic";
const CustomerList = dynamic(() => import('./CustomerList'));
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Customers"
};

// main component
const Customers = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCommerce",
      path: "/apps/ecommerce/customers"
    }, {
      label: "Customers",
      path: "/apps/ecommerce/customers",
      active: true
    }]} title={"Customers"} />

      <div className="row">
        <div className="col-xs-12">
          <CustomerList />
        </div>
      </div>
    </>;
};
export default Customers;