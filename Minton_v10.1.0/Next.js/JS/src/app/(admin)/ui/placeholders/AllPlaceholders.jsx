"use client";

import React from "react";
import { Card, Button, Placeholder } from "react-bootstrap";
import Image from "next/image";

// images
import img2 from "@/assets/images/small/img-2.jpg";
import img4 from "@/assets/images/small/img-4.jpg";
const BasicPlaceholders = () => {
  return <div className="card">
      <div className="card-body">
        <h4 className="header-title">Placeholders</h4>
        <p className="sub-header">
          In the example below, we take a typical card component and recreate it
          with placeholders applied to create a “loading card”. Size and
          proportions are the same between the two.
        </p>

        <div className="row">
          <div className="col-md-6">
            <div className="card border shadow-none mb-md-0">
              <Image className="card-img-top" src={img2.src} width={358} height={238} alt="" />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <div className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </div>
                <Button variant="primary">Go somewhere</Button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border shadow-none mb-0">
              <Image className="card-img-top" src={img4.src} width={358} height={238} alt="" />
              <div className="card-body">
                <Placeholder as={"h5"} className="card-title" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" disabled xs={6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
const PlaceholdersWidth = () => {
  return <div className="card">
      <div className="card-body">
        <h4 className="header-title">Width</h4>
        <p className="sub-header">
          You can change the <code>width</code> through grid column classes,
          width utilities, or inline styles.
        </p>
        <Placeholder xs={6} />
        <Placeholder className="w-75" /> <br />
        <Placeholder style={{
        width: "25%"
      }} />
      </div>
    </div>;
};
const PlaceholdersAnimation = () => {
  return <div className="card">
      <div className="card-body">
        <h4 className="header-title">Animation</h4>
        <p className="sub-header">
          Animate placeholders by setting the prop <code>animation</code> to{" "}
          <code>glow</code> or <code>wave</code> to better convey the perception
          of something being <em>actively</em> loaded.
        </p>

        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder as="p" animation="wave" className="mb-0">
          <Placeholder xs={12} />
        </Placeholder>
      </div>
    </div>;
};
const PlaceholdersWithVariants = () => {
  return <div className="card">
      <div className="card-body">
        <h4 className="header-title">Color</h4>
        <p className="sub-header">
          By default, the <code>placeholder</code> uses{" "}
          <code>currentColor</code>. This can be overriden with a custom color
          or utility class.
        </p>

        <Placeholder xs={12} />

        <Placeholder xs={12} bg="primary" />
        <Placeholder xs={12} bg="secondary" />
        <Placeholder xs={12} bg="success" />
        <Placeholder xs={12} bg="danger" />
        <Placeholder xs={12} bg="warning" />
        <Placeholder xs={12} bg="info" />
        <Placeholder xs={12} bg="light" />
        <Placeholder xs={12} bg="dark" />
      </div>
    </div>;
};
const PlaceholdersConcept = () => {
  return <div className="card">
      <div className="card-body">
        <h4 className="header-title">How it works</h4>
        <p className="sub-header">
          Create placeholders with the <code>Placeholder</code> component and a
          grid column prop (e.g., <code>xs={6}</code>) to set the{" "}
          <code>width</code>. They can replace the text inside an element or be
          added to an existing component via the <code>as</code> prop.
        </p>

        <p aria-hidden="true">
          <Placeholder xs={6} />
        </p>

        <Placeholder.Button xs={4} aria-hidden="true" />
      </div>
    </div>;
};
const PlaceholdersWithSizes = () => {
  return <div className="card">
      <div className="card-body">
        <h4 className="header-title">Sizing</h4>
        <p className="sub-header">
          The size of <code>placeholder</code>s are based on the typographic
          style of the parent element. Customize them with sizing props:{" "}
          <code>lg</code>, <code>sm</code>, or <code>xs</code>.
        </p>

        <Placeholder xs={12} size="lg" />
        <Placeholder xs={12} />
        <Placeholder xs={12} size="sm" />
        <Placeholder xs={12} size="xs" />
      </div>
    </div>;
};
const AllPlaceholders = () => {
  return <div className="row">
      <div className="col-xl-6">
        <BasicPlaceholders />
        <PlaceholdersWidth />
        <PlaceholdersAnimation />
      </div>
      <div className="col-xl-6">
        <PlaceholdersWithVariants />
        <PlaceholdersConcept />
        <PlaceholdersWithSizes />
      </div>
    </div>;
};
export default AllPlaceholders;