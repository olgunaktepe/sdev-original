import React from "react";
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import FileUploader from "@/components/FileUploader";
export const metadata = {
  title: "File Upload"
};
const FileUpload = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Forms",
      path: "/forms/upload"
    }, {
      label: "File Upload",
      path: "/forms/upload",
      active: true
    }]} title={"File Upload"} />

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Dropzone File Upload</h4>
              <p className="sub-header">
                DropzoneJS is an open source library that provides drag’n’drop
                file uploads with image previews.
              </p>

              <FileUploader />

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>;
};
export default FileUpload;