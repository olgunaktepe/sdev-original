import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
const ProductList = dynamic(() => import('./ProductList'));
import PageBreadcrumb from "@/components/PageBreadcrumb";

// pagination
const Pagination = () => {
  return <div className="row">
      <div className="col">
        <ul className="pagination pagination-rounded justify-content-end mb-3">
          <li className="page-item">
            <Link className="page-link" href="" aria-label="Previous">
              <span aria-hidden="true">«</span>
              <span className="visually-hidden">Previous</span>
            </Link>
          </li>
          <li className="page-item active">
            <Link className="page-link" href="">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="">
              4
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="">
              5
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="" aria-label="Next">
              <span aria-hidden="true">»</span>
              <span className="visually-hidden">Next</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>;
};
export const metadata = {
  title: "Products Grid"
};
const ProductsGrid = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCommerce",
      path: "/apps/ecommerce/products-grid"
    }, {
      label: "Products Grid",
      path: "/apps/ecommerce/products-grid",
      active: true
    }]} title={"Products Grid"} />

      <ProductList />

      <Pagination />
    </>;
};
export default ProductsGrid;