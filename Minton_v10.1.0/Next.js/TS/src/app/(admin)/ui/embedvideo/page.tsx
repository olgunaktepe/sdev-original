import React from "react";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

const EmbedVideo = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/embedvideo" },
          { label: "Embed Video", path: "/ui/embedvideo", active: true },
        ]}
        title={"Embed Video"}
      />

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Ratios video 21:9</h4>
              <p className="sub-header">
                Use class <code>.ratio-21x9</code>
              </p>

              {/* 21:9 aspect ratio */}
              <div className="ratio ratio-21x9">
                <iframe
                  src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0"
                  title="iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Ratios video 16:9</h4>
              <p className="sub-header">
                Use class <code>.ratio-16x9</code>
              </p>

              {/* 16:9 aspect ratio */}
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0"
                  title="iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Ratios video 4:3</h4>
              <p className="sub-header">
                Use class <code>.ratio-4x3</code>
              </p>

              {/* 4:3 aspect ratio */}
              <div className="ratio ratio-4x3">
                <iframe
                  src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"
                  title="iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Ratios video 1:1</h4>
              <p className="sub-header">
                Use class <code>.ratio-1x1</code>
              </p>

              {/* 1:1 aspect ratio */}
              <div className="ratio ratio-1x1">
                <iframe
                  src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"
                  title="iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmbedVideo;
