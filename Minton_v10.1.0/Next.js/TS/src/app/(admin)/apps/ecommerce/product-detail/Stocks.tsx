"use client"
import { ProgressBar, Table } from "react-bootstrap";

const Stocks = () => {
  return (
    <Table responsive bordered className="table-centered mb-0">
      <thead className="table-light">
        <tr>
          <th>Outlets</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ASOS Ridley Outlet - NYC</td>
          <td>$139.58</td>
          <td>
            <div className="row align-items-center g-0">
              <div className="col-auto">
                <span className="me-2">27%</span>
              </div>
              <div className="col">
                <ProgressBar
                  now={27}
                  className="progress-sm"
                  variant="danger"
                />
              </div>
            </div>
          </td>
          <td>$1,89,547</td>
        </tr>
        <tr>
          <td>Marco Outlet - SRT</td>
          <td>$149.99</td>
          <td>
            <div className="row align-items-center g-0">
              <div className="col-auto">
                <span className="me-2">71%</span>
              </div>
              <div className="col">
                <ProgressBar
                  now={71}
                  className="progress-sm"
                  variant="success"
                />
              </div>
            </div>
          </td>
          <td>$87,245</td>
        </tr>
        <tr>
          <td>Chairtest Outlet - HY</td>
          <td>$135.87</td>
          <td>
            <div className="row align-items-center g-0">
              <div className="col-auto">
                <span className="me-2">82%</span>
              </div>
              <div className="col">
                <ProgressBar
                  now={82}
                  className="progress-sm"
                  variant="success"
                />
              </div>
            </div>
          </td>
          <td>$5,87,478</td>
        </tr>
        <tr>
          <td>Nworld Group - India</td>
          <td>$159.89</td>
          <td>
            <div className="row align-items-center g-0">
              <div className="col-auto">
                <span className="me-2">42%</span>
              </div>
              <div className="col">
                <ProgressBar
                  now={42}
                  className="progress-sm"
                  variant="warning"
                />
              </div>
            </div>
          </td>
          <td>$55,781</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Stocks