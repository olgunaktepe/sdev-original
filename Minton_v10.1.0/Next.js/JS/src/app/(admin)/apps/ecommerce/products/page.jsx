import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const ProductList = dynamic(() => import('./ProductList'));
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Products List"
};
const Products = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCommerce",
      path: "/apps/ecommerce/products"
    }, {
      label: "Products List",
      path: "/apps/ecommerce/products",
      active: true
    }]} title={"Products List"} />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <Link href="/apps/ecommerce/product-create" className="btn btn-danger mb-2">
                    <i className="mdi mdi-plus-circle me-1"></i> Add Products
                  </Link>
                </div>
                <div className="col-sm-6">
                  <div className="float-sm-end">
                    <button className="btn btn-success mb-2 mb-sm-0">
                      <i className="mdi mdi-cog"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* products list */}
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default Products;