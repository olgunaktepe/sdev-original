"use client"
import { Spinner } from "@/components";
import { Button } from "react-bootstrap";

const ButtonSpinners = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Buttons spinner</h4>
        <p className="sub-header">
          Use spinners within buttons to indicate an action is currently
          processing or taking place. You may also swap the text out of the
          spinner element and utilize button text as needed.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="button-list mb-1 mb-sm-0">
              <Button color="primary" disabled>
                <Spinner type="bordered"
                  className="spinner-border-sm"
                  tag="span"
                  color="white"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>

              <Button color="primary" disabled>
                <Spinner
                  className="spinner-border-sm me-1"
                  tag="span"
                  color="white"
                />
                Loading...
              </Button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="button-list">
              <Button variant="success" disabled>
                <Spinner
                  className="spinner-grow-sm"
                  tag="span"
                  color="white"
                  type="grow"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>

              <Button variant="success" disabled>
                <Spinner
                  className="spinner-grow-sm me-1"
                  tag="span"
                  color="white"
                  type="grow"
                />
                Loading...
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ButtonSpinners