"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import Lightbox, {SlideImage} from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// components
import { Loader } from "@/components";

// dummy data
import { gallery as data, GalleryItem } from "./data";


const GalleryItems = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(data);
  const [category, setCategory] = useState<string>("all");
  const [galleryImages, setGalleryImages] = useState<SlideImage[]>(
    (data || []).map((album) => {
      return album.image;
    })
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * filter images by category
   * @param category category
   */
  const filterImages = (category: string) => {
    setIsLoading(true);
    setCategory(category);
    setTimeout(() => {
      const galleryAlbums =
        category === "all"
          ? data
          : data.filter((album) => album.category?.includes(category));
      setGallery(galleryAlbums);
      setGalleryImages(
        (galleryAlbums || []).map((album) => {
          return album.image;
        })
      );
      setIsLoading(false);
    }, 300);
  };

  /*
   * handle lightbox events
   */
  const openLightbox = () => {
    setIsOpen(true);
  };

  return (
  <>
        <div className="row">
        <div className="col-xs-12">
          <div className="text-center filter-menu">
            <Link
              href=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "all",
              })}
              onClick={() => filterImages("all")}
            >
              All
            </Link>
            <Link
              href=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "web",
              })}
              onClick={() => filterImages("web")}
            >
              Web Design
            </Link>
            <Link
              href=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "graphic",
              })}
              onClick={() => filterImages("graphic")}
            >
              Graphic Design
            </Link>
            <Link
              href=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "illustrator",
              })}
              onClick={() => filterImages("illustrator")}
            >
              Illustrator
            </Link>
            <Link
              href=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "photography",
              })}
              onClick={() => filterImages("photography")}
            >
              Photography
            </Link>
          </div>
        </div>
      </div>

      <div className="row filterable-content position-relative">
        {isLoading && <Loader />}
        {(gallery || []).map((item, index) => {
          return (
            <div className="col-sm-6 col-xl-3 filter-item all illustrator" key={index}>
              <div className="gal-box">
                <Link
                  href=""
                  className="image-popup"
                  onClick={openLightbox}
                >
                  <Image src={item.image!.src} alt="" width={365} height={243} className="img-fluid" />
                </Link>

                <div className="gall-info">
                  <h4 className="font-16 mt-0">{item.title}</h4>
                  <Link href="">
                    <Image
                      src={item.avatar}
                      alt="user-img"
                      className="rounded-circle"
                      height={24}
                      width={24}
                    />
                    <span className="text-muted ms-1">{item.userName}</span>
                  </Link>
                  <Link href="" className="gal-like-btn">
                    <i className="mdi mdi-heart-outline text-danger"></i>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* image lightbox */}
        <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={galleryImages}
        />

  </>
  )
}

export default GalleryItems