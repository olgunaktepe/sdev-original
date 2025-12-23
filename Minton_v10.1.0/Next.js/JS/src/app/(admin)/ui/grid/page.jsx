import dynamic from "next/dynamic";
const GridTable = dynamic(() => import('./GridTable'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Grid"
};
const Grid = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/grid"
    }, {
      label: "Grid System",
      path: "/ui/grid",
      active: true
    }]} title={"Grid System"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Grid options</h4>
              <p className="sub-header">
                See how aspects of the Bootstrap grid system work across
                multiple devices with a handy table.
              </p>

              <GridTable />
            </div>
          </div>
        </div>
      </div>

      {/* example */}
      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">Grid Example</h4>

              <div className="grid-structure">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="grid-container">
                      &lt;Col lg={12}&gt; - col-lg-12
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-11">
                    <div className="grid-container">
                      &lt;Col lg={11}&gt; - col-lg-11
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="grid-container">col-lg-1</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-10">
                    <div className="grid-container">
                      &lt;Col lg={10}&gt; - col-lg-10
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="grid-container">
                      &lt;Col lg={2}&gt; - col-lg-2
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-9">
                    <div className="grid-container">
                      &lt;Col lg={9}&gt; - col-lg-9
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="grid-container">
                      &lt;Col lg={3}&gt; - col-lg-3
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-8">
                    <div className="grid-container">
                      &lt;Col lg={8}&gt; - col-lg-8
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="grid-container">
                      &lt;Col lg={4}&gt; - col-lg-4
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-7">
                    <div className="grid-container">
                      &lt;Col lg={7}&gt; - col-lg-7
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="grid-container">
                      &lt;Col lg={5}&gt; - col-lg-5
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="grid-container">
                      &lt;Col lg={6}&gt; - col-lg-6
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="grid-container">
                      &lt;Col lg={6}&gt; - col-lg-6
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-5">
                    <div className="grid-container">
                      &lt;Col lg={5}&gt; - col-lg-5
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="grid-container">
                      &lt;Col lg={7}&gt; - col-lg-7
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <div className="grid-container">
                      &lt;Col lg={4}&gt; - col-lg-4
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="grid-container">
                      &lt;Col lg={8}&gt; - col-lg-8
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-3">
                    <div className="grid-container">
                      &lt;Col lg={3}&gt; - col-lg-3
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="grid-container">
                      &lt;Col lg={9}&gt; - col-lg-9
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-2">
                    <div className="grid-container">
                      &lt;Col lg={2}&gt; - col-lg-2
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <div className="grid-container">
                      &lt;Col lg={10}&gt; - col-lg-10
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-1">
                    <div className="grid-container">col-lg-1</div>
                  </div>
                  <div className="col-lg-11">
                    <div className="grid-container">
                      &lt;Col lg={11}&gt; - col-lg-11
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-2">
                    <div className="grid-container">col-lg-2</div>
                  </div>
                  <div className="col-lg-3">
                    <div className="grid-container">col-lg-3</div>
                  </div>

                  <div className="col-lg-4">
                    <div className="grid-container">col-lg-4</div>
                  </div>

                  <div className="col-lg-2">
                    <div className="grid-container">col-lg-2</div>
                  </div>

                  <div className="col-lg-1">
                    <div className="grid-container">col-lg-1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default Grid;