import React from "react";
import Link from "next/link";
import classNames from "classnames";

// components

// images
import logo from "@/assets/images/logo-sm.png";
import SimpleBar from "simplebar-react";
import Image from "next/image";

/**
 * Renders the application menu
 */

const IconMenu = ({
  menuItems,
  toggleMenu,
  activeMenuItems
}) => {
  const onMenuItemClick = (e, menuItem) => {
    const hasChildren = menuItem.children && menuItem.children.length;
    if (hasChildren) {
      e.preventDefault();
    }
    toggleMenu(menuItem, true);
  };
  return <>
      <div className="sidebar-icon-menu h-100">
        <SimpleBar style={{
        maxHeight: "100%"
      }}>
          <Link href="/" className="logo">
            <span>
              <Image src={logo} alt="" height={28} width={28} />
            </span>
          </Link>

          <nav className="nav flex-column" id="two-col-sidenav-main">
            {(menuItems || []).map((item, index) => {
            const activeParent = activeMenuItems && activeMenuItems.length && activeMenuItems[activeMenuItems.length - 1] === item["key"];
            return <Link key={index} className={classNames("nav-link", "nav-link-ref", {
              active: activeParent
            })} href={item.children ? "/#" : item.url} title={item.label} data-menu-key={item.key} onClick={e => {
              onMenuItemClick(e, item);
            }}>
                  <i className={item.icon} />
                </Link>;
          })}
          </nav>
        </SimpleBar>
      </div>
    </>;
};
export default IconMenu;