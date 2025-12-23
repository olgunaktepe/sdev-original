import React from "react";
import dynamic from "next/dynamic";
const ShoppingDetail = dynamic(() => import('./ShoppingDetail'));
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Shopping Cart"
};
const Cart = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCommerce",
      path: "/apps/ecommerce/shopping-cart"
    }, {
      label: "Shopping Cart",
      path: "/apps/ecommerce/shopping-cart",
      active: true
    }]} title={"Shopping Cart"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <ShoppingDetail />
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default Cart;