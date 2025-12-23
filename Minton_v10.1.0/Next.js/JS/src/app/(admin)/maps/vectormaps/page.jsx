import React from "react";
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { CanadaVectorMap, IraqVectorMap, ItalyVectorMap, RussiaVectorMap, SpainVectorMap, UsaVectorMap, WorldVectorMap } from "@/components/VectorMap";

// react plugin for creating vector maps

// const WorldVectorMap = dynamic(() => import('@/components/VectorMap/WorldMap'), { ssr: false })
// const RussiaVectorMap = dynamic(() => import('@/components/VectorMap/RussiaMap'), { ssr: false })
// const SpainVectorMap = dynamic(() => import('@/components/VectorMap/SpainMap'), { ssr: false })
// const CanadaVectorMap = dynamic(() => import('@/components/VectorMap/CanadaMap'), { ssr: false })
// const UsaVectorMap = dynamic(() => import('@/components/VectorMap/UsaVectorMap'), { ssr: false })
// const ItalyVectorMap = dynamic(() => import('@/components/VectorMap/ItalyVectorMap'), { ssr: false })
// const IraqVectorMap = dynamic(() => import('@/components/VectorMap/IraqVectorMap'), { ssr: false })

export const metadata = {
  title: "Vector Maps"
};
const VectorMaps = () => {
  // vector map config
  const worldMapOptions = {
    backgroundColor: "transparent",
    regionStyle: {
      initial: {
        fill: "#d4dadd"
      }
    },
    markers: [{
      coords: [41.9, 12.45],
      name: "Vatican City"
    }, {
      coords: [43.73, 7.41],
      name: "Monaco"
    }, {
      coords: [-0.52, 166.93],
      name: "Nauru"
    }, {
      coords: [-8.51, 179.21],
      name: "Tuvalu"
    }, {
      coords: [43.93, 12.46],
      name: "San Marino"
    }, {
      coords: [47.14, 9.52],
      name: "Liechtenstein"
    }, {
      coords: [7.11, 171.06],
      name: "Marshall Islands"
    }, {
      coords: [17.3, -62.73],
      name: "Saint Kitts and Nevis"
    }, {
      coords: [3.2, 73.22],
      name: "Maldives"
    }, {
      coords: [35.88, 14.5],
      name: "Malta"
    }, {
      coords: [12.05, -61.75],
      name: "Grenada"
    }, {
      coords: [13.16, -61.23],
      name: "Saint Vincent and the Grenadines"
    }, {
      coords: [13.16, -59.55],
      name: "Barbados"
    }, {
      coords: [17.11, -61.85],
      name: "Antigua and Barbuda"
    }, {
      coords: [-4.61, 55.45],
      name: "Seychelles"
    }, {
      coords: [7.35, 134.46],
      name: "Palau"
    }, {
      coords: [42.5, 1.51],
      name: "Andorra"
    }, {
      coords: [14.01, -60.98],
      name: "Saint Lucia"
    }, {
      coords: [6.91, 158.18],
      name: "Federated States of Micronesia"
    }, {
      coords: [1.3, 103.8],
      name: "Singapore"
    }, {
      coords: [0.33, 6.73],
      name: "SÃ£o TomÃ© and PrÃncipe"
    }],
    markerStyle: {
      initial: {
        r: 9,
        fill: "#3bafda",
        "fill-opacity": 0.9,
        stroke: "#fff",
        "stroke-width": 7,
        "stroke-opacity": 0.4
      },
      hover: {
        fill: "#3bafda",
        stroke: "#fff",
        "fill-opacity": 1,
        "stroke-width": 1.5
      }
    }
  };
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Maps",
      path: "/maps/vectormaps"
    }, {
      label: "Vector Maps",
      path: "/maps/vectormaps",
      active: true
    }]} title={"Vector Maps"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">World Vector Map</h4>
              <WorldVectorMap height="420px" width="100%" options={worldMapOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">Russia Vector Map</h4>
              <RussiaVectorMap height="350px" width="100%" options={{
              zoomOnScroll: false,
              regionStyle: {
                initial: {
                  fill: "#3bafda"
                }
              }
            }} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">Spain Vector Map</h4>
              <SpainVectorMap height="350px" width="100%" options={{
              zoomOnScroll: false,
              backgroundColor: "transparent",
              regionStyle: {
                initial: {
                  fill: "#f7b84b"
                }
              }
            }} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">Canada Vector Map</h4>
              <CanadaVectorMap height="350px" width="100%" options={{
              zoomOnScroll: false,
              backgroundColor: "transparent",
              regionStyle: {
                initial: {
                  fill: "#1abc9c"
                }
              }
            }} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">USA Vector Map</h4>
              <UsaVectorMap height="350px" width="100%" options={{
              zoomOnScroll: false,
              backgroundColor: "transparent",
              regionStyle: {
                initial: {
                  fill: "#6559cc"
                }
              }
            }} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">Italy Vector Map</h4>
              <ItalyVectorMap height="350px" width="100%" options={{
              zoomOnScroll: false,
              backgroundColor: "transparent",
              regionStyle: {
                initial: {
                  fill: "#4a81d4"
                }
              }
            }} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mb-3">Iraq Vector Map</h4>
              <IraqVectorMap height="350px" width="100%" options={{
              zoomOnScroll: false,
              backgroundColor: "transparent",
              regionStyle: {
                initial: {
                  fill: "#f1556c"
                }
              }
            }} />
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default VectorMaps;