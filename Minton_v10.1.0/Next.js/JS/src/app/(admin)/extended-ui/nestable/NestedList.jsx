"use client";

import React, { useState } from "react";
import Nestable from "react-nestable";

// styles
import "react-nestable/dist/styles/index.css";
const items = [{
  id: 0,
  text: "Choose a smartwatch"
}, {
  id: 1,
  text: "Send design for review",
  children: [{
    id: 2,
    text: " Coffee with the team"
  }, {
    id: 3,
    text: " Ready my new work"
  }, {
    id: 4,
    text: " Make a wireframe",
    children: [{
      id: 5,
      text: "  Video app redesign"
    }, {
      id: 6,
      text: " iOS apps design completed"
    }, {
      id: 7,
      text: "  Dashboard design started"
    }]
  }, {
    id: 8,
    text: " Homepage design"
  }, {
    id: 9,
    text: " Developed UI Kit"
  }]
}];
const items2 = [{
  id: 0,
  text: "Item 13"
}, {
  id: 1,
  text: "Item 14"
}, {
  id: 2,
  text: "Item 15",
  children: [{
    id: 3,
    text: "Item 16"
  }, {
    id: 4,
    text: "Item 17"
  }, {
    id: 5,
    text: "Item 18"
  }]
}];
const RenderItem = ({
  item,
  collapseIcon,
  handler
}) => {
  return <div className="dd-list">
      <div className="dd-item">
        <div className="dd-handle">
          {handler}
          {collapseIcon}
          {item.text}
        </div>
      </div>
    </div>;
};
const NestedList = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return <>
         <div className="row">
        <div className="col-lg-12">
          <div className="text-start">
            <button type="button" className="btn btn-purple btn-sm waves-effect mb-3 waves-light me-1" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? "Expand all" : "Collapse all"}
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="header-title">Nestable Lists 1</h4>
                  <p className="sub-header">
                    Drag & drop hierarchical list with mouse and touch
                    compatibility
                  </p>
                  <Nestable items={items} renderItem={RenderItem} className="custom-dd dd font-13 mb-3 mb-lg-0" collapsed={isCollapsed} />
                </div>
                <div className="col-md-6">
                  <h4 className="header-title">Nestable Lists 2</h4>
                  <p className="sub-header">
                    Drag & drop hierarchical list with mouse and touch
                    compatibility
                  </p>
                  <Nestable items={items2} renderItem={RenderItem} className="font-13" handler={<span className="dragula-handle text-muted me-3 font-20" />} collapsed={isCollapsed} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   </>;
};
export default NestedList;