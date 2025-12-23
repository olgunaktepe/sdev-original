"use client";

import React, { Suspense, useState } from "react";
import { useLayoutContext } from "@/context/useLayoutContext";
import Topbar from "@/layouts/Topbar";
import Navbar from "@/layouts/HorizontalLayout/Navbar";
import Footer from "@/layouts/Footer";
import RightSidebar from "@/layouts/RightSidebar";
const loading = () => <div className="text-center"></div>;
const HorizontalLayout = ({
  children
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const {
    themeCustomizer
  } = useLayoutContext();

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }
  };
  return <>
            <div id="wrapper">
                <Suspense fallback={loading()}>
                    <Topbar openLeftMenuCallBack={openMenu} topbarDark={false} />
                </Suspense>

                <Suspense fallback={loading()}>
                    <Navbar isMenuOpened={isMenuOpened} />
                </Suspense>
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <Suspense fallback={loading()}>{children}</Suspense>
                        </div>
                    </div>

                    <Suspense fallback={loading()}>
                        <Footer />
                    </Suspense>

                    {themeCustomizer.open && <Suspense fallback={loading()}>
                            <RightSidebar />
                        </Suspense>}
                </div>
            </div>
        </>;
};
export default HorizontalLayout;