import React from "react";
const FileList = dynamic(() => import('./FileList'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import dynamic from "next/dynamic";
export const metadata = {
  title: "File Manager"
};
const FileManager = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Apps",
      path: "/apps/file-manager"
    }, {
      label: "File Manager",
      path: "/apps/file-manager",
      active: true
    }]} title={"File Manager"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <div className="fileupload btn btn-success waves-effect waves-light mb-3">
                <span>
                  <i className="mdi mdi-cloud-upload me-1"></i> Upload Files
                </span>
                <input type="file" className="upload" />
              </div>
              <FileList />
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default FileManager;