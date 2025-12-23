import React from "react";
import { Metadata } from "next";
import GalleryItems from "@/app/(admin)/pages/gallery/GalleryItems";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Gallery",
}

const Gallery = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/gallery" },
          { label: "Gallery", path: "/pages/gallery", active: true },
        ]}
        title={"Gallery"}
      />
      <GalleryItems />
    </>
  );
};

export default Gallery;
