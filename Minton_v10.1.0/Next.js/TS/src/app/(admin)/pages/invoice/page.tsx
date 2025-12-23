import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const WindowPrintButton = dynamic(() => import('./WindowPrintButton'))

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// images
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";

// dummy data
import { invoiceData } from "../data";

export const metadata: Metadata = {
  title: "Invoice",
}

// invoice component
const Invoice = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/invoice" },
          { label: "Invoice", path: "/pages/invoice", active: true },
        ]}
        title={"Invoice"}
      />

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-start">
                  <div className="auth-logo">
                    <div className="logo logo-dark">
                      <span className="logo-lg">
                        <Image src={logoDark} alt="logo" height={22} width={119} />
                      </span>
                    </div>
                    <div className="logo logo-light">
                      <span className="logo-lg">
                        <Image src={logoLight} alt="logo" height={22} width={119} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="float-end">
                  <h4 className="m-0 d-print-none">Invoice</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mt-3">
                    <p>
                      <b>Hello, {invoiceData.customer}</b>
                    </p>
                    <p className="text-muted">{invoiceData.notes}</p>
                  </div>
                </div>

                <div className="col-md-4 offset-md-2">
                  <div className="mt-3 float-end">
                    <p>
                      <strong>Order Date : </strong>{" "}
                      <span className="float-end">
                        {" "}
                        &nbsp;&nbsp;&nbsp; {invoiceData.order_date}{" "}
                      </span>
                    </p>
                    <p>
                      <strong>Order Status : </strong>{" "}
                      <span className="float-end">
                        {" "}
                        <span className="badge bg-danger">
                          {invoiceData.order_status}
                        </span>
                      </span>
                    </p>
                    <p>
                      <strong>Order No. : </strong>
                      <span className="float-end">
                        {" "}
                        <span className="float-end">
                          {invoiceData.invoice_id}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-6">
                  <h5>Billing Address</h5>
                  <address>
                    {invoiceData.address.owner}
                    <br />
                    {invoiceData.address.line_1}
                    <br />
                    {invoiceData.address.city}, {invoiceData.address.state}{" "}
                    {invoiceData.address.zip}
                    <br />
                    <abbr title="Phone">P:</abbr> {invoiceData.address.phone}
                  </address>
                </div>
                <div className="col-sm-6">
                  <h5>Shipping Address</h5>
                  <address>
                    {invoiceData.address.owner}
                    <br />
                    {invoiceData.address.line_1}
                    <br />
                    {invoiceData.address.city}, {invoiceData.address.state}{" "}
                    {invoiceData.address.zip}
                    <br />
                    <abbr title="Phone">P:</abbr> {invoiceData.address.phone}
                  </address>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-12">
                  <div className="table-responsive">
                    <table className="table mt-4 table-centered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                          <th style={{ width: "10%" }}>Hours</th>
                          <th style={{ width: "10%" }}>Hours Rate</th>
                          <th style={{ width: "10%" }} className="text-end">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(invoiceData.items || []).map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                <b>{item.name}</b> <br />
                                {item.description}
                              </td>
                              <td>{item.hours}</td>
                              <td>{item.hour_rate}</td>
                              <td className="text-end">{item.total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="clearfix pt-5">
                    <h6 className="text-muted">Notes:</h6>
                    <small className="text-muted">
                      All accounts are to be paid within 7 days from receipt of
                      invoice. To be paid by cheque or credit card or direct
                      payment online. If account is not paid within 7 days the
                      credits details supplied as confirmation of work
                      undertaken will be charged the agreed quoted fee noted
                      above.
                    </small>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="float-end">
                    <p>
                      <b>Sub-total:</b>{" "}
                      <span className="float-end">
                        ${invoiceData.sub_total}
                      </span>
                    </p>
                    <p>
                      <b>Discount (10%):</b>{" "}
                      <span className="float-end">
                        {" "}
                        &nbsp;&nbsp;&nbsp; ${invoiceData.discount}
                      </span>
                    </p>
                    <h3>${invoiceData.total} USD</h3>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>

              <div className="mt-4 mb-1">
                <div className="text-end d-print-none">
                  <WindowPrintButton />
                  <button className="btn btn-success waves-effect waves-light">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Invoice;
