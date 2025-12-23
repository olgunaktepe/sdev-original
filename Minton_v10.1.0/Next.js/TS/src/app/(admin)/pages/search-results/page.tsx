import React from "react";
import { Metadata } from "next";

// components
import PageBreadcrumb  from "@/components/PageBreadcrumb";
import ResultList from "@/app/(admin)/pages/search-results/ResultList";

export const metadata: Metadata = {
  title: "Search Results",
}

const SearchResults = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/search-results" },
          {
            label: "Search Results",
            path: "/pages/search-results",
            active: true,
          },
        ]}
        title={"Search Results"}
      />

      <div className="row">
        <div className="col">
          <div className="card search-result-box">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <div className="pt-3 pb-4">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Admin Dashboard"
                      />
                      <button
                        type="button"
                        className="input-group-text btn waves-effect waves-light btn-purple"
                      >
                        <i className="fa fa-search me-1"></i> Search
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <h4>Search Results For &quot;Admin Dashboard&quot;</h4>
                    </div>
                  </div>
                </div>
              </div>
              <ResultList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
