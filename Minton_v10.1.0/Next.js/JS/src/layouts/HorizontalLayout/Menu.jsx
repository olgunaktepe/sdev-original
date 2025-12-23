import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";

// helpers
import { findAllParent, findMenuItem } from "@/helpers/menu";

// constants

// utils
import { splitArray } from "@/utils";

// custom hook
import { useViewport } from "../../hooks";
import Link from "next/link";
const MenuItemWithChildren = ({
  item,
  tag,
  linkClassName,
  className,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu
}) => {
  const Tag = tag;
  const {
    width
  } = useViewport();
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  const showMenu = width <= 768 && open;
  const hasChild = item.children && (item.children || []).filter(child => child.children?.length && child.children);
  const hasGrandChild = !(hasChild.length > 0 && hasChild) && item.children.length >= 15;
  const chunks = hasGrandChild ? splitArray(item.children, 7) : [];
  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item]);

  /**
   * toggles the menu
   */
  const toggleMenuItem = e => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };
  return <Tag className={classNames("dropdown", className, activeMenuItems.includes(item.key) ? "active" : "")}>
      <Link href="/#" onClick={toggleMenuItem} data-menu-key={item.key} className={classNames("dropdown-toggle", linkClassName, {
      active: activeMenuItems.includes(item.key)
    })} id={item.key} role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded={open}>
        {item.icon && <i className={classNames(item.icon, "me-1")} />}
        <span> {item.label} </span>
        <div className="arrow-down"></div>
      </Link>

      {item.children && (hasGrandChild ? <div className={classNames(subMenuClassNames, "mega-dropdown-menu dropdown-mega-menu-xl", {
      show: showMenu
    })} aria-labelledby={item.key}>
            <div className="row">
              {(chunks || []).map((child, i) => {
          return <div className="col-lg-4" key={i}>
                    <MegaMenu item={child} activeMenuItems={activeMenuItems} />
                  </div>;
        })}
            </div>
          </div> : <div className={classNames(subMenuClassNames, {
      show: showMenu
    })} aria-labelledby={item.key}>
            {(item.children || []).map((child, i) => {
        return <React.Fragment key={i}>
                  {child.children ? <>
                      {/* parent */}
                      <MenuItemWithChildren item={child} tag="div" linkClassName={classNames("dropdown-item", activeMenuItems.includes(child.key) ? "active" : "")} activeMenuItems={activeMenuItems} className="" subMenuClassNames="dropdown-menu" toggleMenu={toggleMenu} />
                    </> : <>
                      {/* child */}
                      <MenuItemLink item={child} className={classNames("dropdown-item", {
              active: activeMenuItems.includes(child.key)
            })} />
                    </>}
                </React.Fragment>;
      })}
          </div>)}
    </Tag>;
};
const MenuItem = ({
  item,
  className,
  linkClassName
}) => {
  return <li className={classNames("nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>;
};
const MenuItemLink = ({
  item,
  className
}) => {
  return <Link href={item.url} target={item.target} className={classNames(className)} data-menu-key={item.key}>
      {item.icon && <i className={classNames(item.icon, "me-1")} />}
      <span> {item.label} </span>
    </Link>;
};
const MegaMenu = ({
  item,
  activeMenuItems
}) => {
  return <>
      {item.map((child, i) => {
      return <MenuItemLink key={i} item={child} className={classNames("dropdown-item", {
        active: activeMenuItems.includes(child.key)
      })} />;
    })}
    </>;
};

/**
 * Renders the application menu
 */

const AppMenu = ({
  menuItems
}) => {
  const menuRef = useRef(null);
  const [topnavMenuItems] = useState(menuItems);
  const [activeMenuItems, setActiveMenuItems] = useState([]);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem, show) => {
    if (show) setActiveMenuItems([menuItem["key"], ...findAllParent(topnavMenuItems, menuItem)]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const div = document.getElementById("main-side-menu");
    let matchingMenuItem = null;
    if (div) {
      const items = div.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        const trimmedURL = '';
        if (trimmedURL === items[i]?.pathname?.replaceAll(process.env.PUBLIC_URL, "")) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute("data-menu-key");
        const activeMt = findMenuItem(topnavMenuItems, mid);
        if (activeMt) {
          setActiveMenuItems([activeMt["key"], ...findAllParent(topnavMenuItems, activeMt)]);
        }
      }
    }
  }, [topnavMenuItems]);
  useEffect(() => {
    if (topnavMenuItems && topnavMenuItems.length > 0) activeMenu();
  }, [activeMenu, topnavMenuItems]);
  return <>
      <ul className="navbar-nav" ref={menuRef} id="main-side-menu">
        {(topnavMenuItems || []).map((item, idx) => {
        return <React.Fragment key={idx}>
              {item.children ? <MenuItemWithChildren item={item} tag="li" className="nav-item" subMenuClassNames="dropdown-menu" activeMenuItems={activeMenuItems} linkClassName="nav-link" toggleMenu={toggleMenu} /> : <MenuItem item={item} linkClassName={classNames("nav-link", "dropdown-toggle", {
            active: activeMenuItems.includes(item.key)
          })} />}
            </React.Fragment>;
      })}
      </ul>
    </>;
};
export default AppMenu;