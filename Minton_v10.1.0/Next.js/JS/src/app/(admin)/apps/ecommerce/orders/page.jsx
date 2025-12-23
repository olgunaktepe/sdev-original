import React from "react";
const OrderList = dynamic(() => import('./OrderList'));
import PageBreadcrumb from "@/components/PageBreadcrumb";
import dynamic from "next/dynamic";
export const metadata = {
  title: "Orders"
};
// main component
const Orders = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCcommerce",
      path: "/apps/ecommerce/orders"
    }, {
      label: "Orders",
      path: "/apps/ecommerce/orders",
      active: true
    }]} title={"Orders"} />

      <div className="row">
        <div className="col-xs-12">
          <OrderList />
        </div>
      </div>
    </>;
};
export default Orders;