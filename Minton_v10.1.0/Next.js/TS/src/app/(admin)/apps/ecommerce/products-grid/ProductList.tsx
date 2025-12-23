"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { products as data, ProductItemTypes } from "../data";


const ProductBox = ({ product }: { product: ProductItemTypes }) => {
  const rating: number = Math.floor(product.rating || 0);
  const emptyStars: number = Math.floor(rating < 5 ? 5 - rating : 0);

  return (
    <div className="card product-box">
      <div className="product-img">
        <div className="p-3">
          <Image src={product.image} alt="product" className="img-fluid" height={334} width={334} />
        </div>
        <div className="product-action">
          <div className="d-flex">
            <Link href="" className="btn btn-white d-block w-100 action-btn m-2">
              <i className="ri-edit-2-fill align-middle"></i> Edit
            </Link>
            <Link href="" className="btn btn-white d-block w-100 action-btn m-2">
              <i className="ri-delete-bin-fill align-middle"></i> Delete
            </Link>
          </div>
        </div>
      </div>

      <div className="product-info border-top p-3">
        <div>
          <h5 className="font-16 mt-0 mb-1">
            <Link href="/apps/ecommerce/product-details" className="text-dark">
              {product.product}
            </Link>
          </h5>
          <p className="text-muted">
            {(Array(rating) || []).map((x, i) => (
              <i key={i} className="mdi mdi-star text-warning"></i>
            ))}
            {(Array(emptyStars) || []).map((x, i) => (
              <i key={i} className="mdi mdi-star"></i>
            ))}
          </p>
          <h4 className="m-0">
            <span className="text-muted"> Price : {product.price}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};
const ProductList = () => {
  const [products, setProducts] = useState<Array<ProductItemTypes>>(data);

  /*
   * search product by name
   */
  const searchProduct = (value: string) => {
    if (value === "") setProducts(data);
    else {
      let modifiedProducts = data;
      modifiedProducts = modifiedProducts.filter((item) =>
        item.product.toLowerCase().includes(value)
      );
      setProducts(modifiedProducts);
    }
  };
  return (
    <>
      <div className="row mb-2">
        <div className="col-sm-4">
          <Link
            href="/apps/ecommerce/product-create"
            className="btn btn-danger mb-2"
          >
            <i className="mdi mdi-plus-circle me-1"></i> Add Products
          </Link>
        </div>
        <div className="col-sm-8">
          <div className="float-sm-end">
            <form className="d-flex align-items-center flex-wrap">
              <div className="me-2">
                <label
                  htmlFor="productssearch-input"
                  className="visually-hidden"
                >
                  Search
                </label>
                <input
                  type="search"
                  className="form-control border-light"
                  id="productssearch-input"
                  placeholder="Search..."
                  onChange={(e: any) => searchProduct(e.target.value)}
                />
              </div>
              <Button variant="success" className="mb-2 mb-sm-0">
                <i className="mdi mdi-cog"></i>
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        {(products.slice(0, 8) || []).map((product, index) => {
          return (
            <div className="col-md-6 col-xl-3" key={index}>
              <ProductBox product={product} />
            </div>
          );
        })}
      </div>
    </>
  )
}

export default ProductList