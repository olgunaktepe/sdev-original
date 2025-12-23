import Link from "next/link";
import dynamic from "next/dynamic";
const TaskDropdown = dynamic(() => import('./TaskDropdown'))
const AllTask = dynamic(() => import('./AllTask'))
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks List",
}

// Task List
const TaskList = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Tasks", path: "/apps/tasks/list" },
          { label: "Tasks List", path: "/apps/tasks/list", active: true },
        ]}
        title={"Tasks List"}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  {/* cta */}
                  <div className="row">
                    <div className="col-sm-3">
                      <Link
                        href=""
                        className="btn btn-primary waves-effect waves-light"
                      >
                        <i className="fe-plus me-1"></i>Add New
                      </Link>
                    </div>
                    <div className="col-sm-9">
                      <div className="float-sm-end mt-3 mt-sm-0">
                        <div className="d-flex align-items-start flex-wrap">
                          <div className="mb-3 mb-sm-0 me-sm-2">
                            <form>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search..."
                                />
                              </div>
                            </form>
                          </div>
                          <TaskDropdown />
                        </div>
                      </div>
                    </div>
                  </div>
                  <AllTask />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
