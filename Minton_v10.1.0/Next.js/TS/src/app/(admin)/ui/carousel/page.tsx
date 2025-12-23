import React, { Fragment } from "react";
import { Metadata } from "next";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import CarouselSliders from "@/app/(admin)/ui/carousel/CarouselSliders";

export const metadata: Metadata = {
  title: "Carousel"
}

const Carousels = () => {
  return (
    <Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/carousel" },
          { label: "Carousel", path: "/ui/carousel", active: true },
        ]}
        title={"Carousel"}
      />

      <CarouselSliders />

    </Fragment>
  );
};

export default Carousels;
