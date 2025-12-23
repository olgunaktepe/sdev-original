import React from "react";
import dynamic from "next/dynamic";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import {Metadata} from "next";
import {Col, Row} from "react-bootstrap";

const CheckOutPage = dynamic(() => import('./CheckOutPage'))

export const metadata: Metadata = {
    title: "Checkout",
}

const Checkout = () => {

    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    {label: "Ecommerce", path: "/apps/ecommerce/checkout"},
                    {label: "Checkout", path: "/apps/ecommerce/checkout", active: true},
                ]}
                title={"Checkout"}
            />
            <Row>
                <Col lg={12}>
                    <CheckOutPage/>
                </Col>
            </Row>
        </>
    );
};

export default Checkout;
