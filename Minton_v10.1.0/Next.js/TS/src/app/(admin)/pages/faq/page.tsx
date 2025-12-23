import React from "react";
import dynamic from "next/dynamic";
const FAQs = dynamic(() => import('./FAQs'))

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
}

// FAQ component
const FAQ = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/faq" },
          { label: "FAQs", path: "/pages/faq", active: true },
        ]}
        title={"FAQs"}
      />

      <div className="row">
        <div className="col">
          <div className="text-center">
            <i className="h1 mdi mdi-comment-multiple-outline text-muted"></i>
            <h3 className="mb-3">Frequently Asked Questions</h3>
            <p className="text-muted">
              Nisi praesentium similique totam odio obcaecati, reprehenderit,
              dignissimos rem temporibus ea inventore alias!
              <br /> Beatae animi nemo ea tempora, temporibus laborum facilis
              ut!
            </p>

            <button
              type="button"
              className="btn btn-success waves-effect waves-light mt-2 me-1"
            >
              <i className="mdi mdi-email-outline me-1"></i> Email us your
              question
            </button>
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light mt-2"
            >
              <i className="mdi mdi-twitter me-1"></i> Send us a tweet
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-xs-12">
          <FAQs />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FAQ;
