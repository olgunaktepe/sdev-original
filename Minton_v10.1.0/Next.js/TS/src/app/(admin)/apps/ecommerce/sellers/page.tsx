import React from "react";
import Image from "next/image";
import Link from "next/link";
const SellerDropdown = dynamic(() => import('./SellerDropdown'))

// dummy data
import { sellers, SellersItemTypes } from "../data";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const SellerInfo = ({ item }: { item: SellersItemTypes }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-start">
          {item.image ? (
            <div className="me-3">
              <Image src={item.image} alt="avatar" className="rounded avatar-md" height={56} width={56} />
            </div>
          ) : (
            <div className="avatar-md me-3">
              <div className="avatar-title bg-light rounded text-body font-20 fw-semibold">
                {item.store[0]}
              </div>
            </div>
          )}
          <div className="flex-1">
            <h5 className="my-1">
              <Link href="" className="text-dark">
                {item.store}
              </Link>
            </h5>
            <p className="text-muted mb-0">
              <i className="mdi mdi-account me-1"></i> {item.name}
            </p>
          </div>
          <SellerDropdown />
        </div>

        <hr />

        <div className="text-muted">
          <div className="row">
            <div className="col-sm-4 col-xs-6">
              <div>
                <p className="mb-0">Products</p>
                <h5 className="mb-sm-0">{item.products}</h5>
              </div>
            </div>
            <div className="col-sm-4 col-xs-6">
              <div>
                <p className="mb-0">Wallet Balance</p>
                <h5 className="mb-sm-0">{item.balance}</h5>
              </div>
            </div>
            <div className="col-sm-4 col-xs-6">
              <div className="mt-3 mt-sm-0">
                <p className="mb-0">Revenue</p>
                <h5 className="mb-0">{item.revenue}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const metadata: Metadata = {
  title: "Sellers",
}
const Sellers = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "eCommerce", path: "/apps/ecommerce/sellers" },
          {
            label: "Sellers",
            path: "/apps/ecommerce/sellers",
            active: true,
          },
        ]}
        title={"Sellers"}
      />

      <div className="row mb-2">
        <div className="col-sm-4">
          <Link href="" className="btn btn-danger mb-2">
            <i className="mdi mdi-plus-circle me-1"></i> Add Sellers
          </Link>
        </div>
        <div className="col-sm-8">
          <div className="float-sm-end">
            <form className="d-flex flex-wrap align-items-center">
              <div className="d-flex flex-wrap align-items-center me-2">
                <label htmlFor="sellersearch-input" className="visually-hidden">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control"
                  id="sellersearch-input"
                  placeholder="Search..."
                />
              </div>
              <button type="button" className="btn btn-success mb-2 mb-sm-0">
                <i className="mdi mdi-cog"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        {(sellers || []).map((item, index) => {
          return (
            <div className="col-lg-6" key={index}>
              <SellerInfo item={item} />
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div>
            <div className="text-center my-3">
              <Link href="" className="text-danger">
                <i className="mdi mdi-spin mdi-loading font-20 align-middle me-2"></i>{" "}
                Load more{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sellers;
