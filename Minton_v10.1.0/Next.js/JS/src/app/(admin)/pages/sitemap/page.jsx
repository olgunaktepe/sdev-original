import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// dummy data
import { sitemap1, sitemap2, sitemap3 } from "./data";

// images
import logo from "@/assets/images/logo-sm-dark.png";
const SiteMenuTitle = ({
  label
}) => {
  return <Link href="" className="text-uppercase fw-bold">
      <Image src={logo} alt="" height={12} width={12} className="me-1" /> {label}
    </Link>;
};
const SiteMapMenu = ({
  item
}) => {
  return <ul>
      {(item.children || []).map((item, index) => <SiteMapMenuItem key={index} item={item} />)}
    </ul>;
};
const SiteMapMenuItem = ({
  item
}) => {
  const {
    children,
    level
  } = item;
  const hasChildren = item && children && children.length;
  return <li>
      <Link href="" className={classNames(item.className)}>
        {item.icon && <i className={classNames(item.icon, "me-1")}></i>}
        {level === 1 ? <b>{item.label}</b> : item.label}
      </Link>
      {hasChildren && <SiteMapMenu item={item} />}
    </li>;
};
export const metadata = {
  title: "Sitemap"
};
const Sitemap = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Extra Pages",
      path: "/pages/sitemap"
    }, {
      label: "Sitemap",
      path: "/pages/sitemap",
      active: true
    }]} title={"Sitemap"} />
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <ul className="sitemap">
                    <li>
                      <SiteMenuTitle label={sitemap1["label"]} />
                      <SiteMapMenu item={sitemap1} />
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <ul className="sitemap">
                    <li>
                      <SiteMenuTitle label={sitemap2["label"]} />
                      <SiteMapMenu item={sitemap2} />
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <ul className="sitemap">
                    <li>
                      <SiteMenuTitle label={sitemap3["label"]} />
                      <SiteMapMenu item={sitemap3} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default Sitemap;