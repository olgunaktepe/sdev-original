"use client";

import Link from "next/link";
import { Card, CardGroup, ListGroup, Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import Image from "next/image";

// images
import cardImg from "@/assets/images/small/img-1.jpg";
import cardImg2 from "@/assets/images/small/img-4.jpg";
import cardImg3 from "@/assets/images/small/img-2.jpg";
import cardImg4 from "@/assets/images/small/img-3.jpg";
import cardImg5 from "@/assets/images/small/img-5.jpg";
import cardImg6 from "@/assets/images/small/img-6.jpg";
import cardImg7 from "@/assets/images/small/img-7.jpg";
const CardWithImage = () => {
  return <div className="card">
      <Card.Img src={cardImg.src} variant="top" className="img-fluid" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content. With supporting text below as a natural
          lead-in to additional content.
        </div>
        <Link href="" className="btn btn-primary waves-effect waves-light">
          Button
        </Link>
      </div>
    </div>;
};
const CardWithImage2 = () => {
  return <div className="card">
      <Card.Img src={cardImg3.src} variant="top" className="img-fluid" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <div className="card-text">
          Some quick example text to build on the card title.
        </div>
      </div>

      <ListGroup variant="flush">
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      </ListGroup>

      <div className="card-body">
        <Card.Link href="" className="text-custom">
          Card link
        </Card.Link>
        <Card.Link href="" className="text-custom">
          Another link
        </Card.Link>
      </div>
    </div>;
};
const CardWithImage3 = () => {
  return <div className="card">
      <Card.Img src={cardImg4.src} variant="top" className="img-fluid" />
      <div className="card-body">
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content. With supporting text below as a natural
          lead-in to additional content.
        </div>
        <Link href="" className="btn btn-primary waves-effect waves-light">
          Button
        </Link>
      </div>
    </div>;
};
const CardWithTitleAndImage = () => {
  return <div className="card">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <Card.Subtitle as="h6" className="text-muted">
          Support card subtitle
        </Card.Subtitle>
      </div>
      <Card.Img src={cardImg2.src} variant="top" className="img-fluid" />
      <div className="card-body">
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </div>
        <Card.Link href="" className="text-custom">
          Card link
        </Card.Link>
        <Card.Link href="" className="text-custom">
          Another link
        </Card.Link>
      </div>
    </div>;
};
const CardWithSpecialTitle = () => {
  return <div className="card card-body">
      <h5 className="card-title">Special title treatment</h5>
      <div className="card-text">
        With supporting text below as a natural lead-in to additional content.
      </div>
      <Link href="" className="btn btn-primary waves-effect waves-light">
        Go somewhere
      </Link>
    </div>;
};
const CardWithHeader = () => {
  return <div className="card">
      <h5 className="card-header">Featured</h5>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <div className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </div>
        <Link href="" className="btn btn-primary waves-effect waves-light">
          Go somewhere
        </Link>
      </div>
    </div>;
};
const CardWithHeaderAndQuote = () => {
  return <div className="card">
      <div className="card-header">Quote</div>
      <div className="card-body">
        <blockquote className="card-bodyquote mb-0">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </div>
    </div>;
};
const CardWithHeaderAndFooter = () => {
  return <div className="card text-xs-center">
      <div className="card-header">Featured</div>
      <div className="card-body">
        <div className="card-text">
          With supporting text below as a natural lead-in to additional content.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </div>;
};
const CardWithImageCaps = ({
  position,
  image
}) => {
  return <>
      <div className="card">
        {position === "top" && <Card.Img variant={position} src={image.src} className="img-fluid" />}
        <div className="card-body">
          <Card.Title as={"h5"}>Card title</Card.Title>
          <div className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </div>
          <div className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        {position === "bottom" && <Card.Img variant={position} src={image.src} className="img-fluid" />}
      </div>
    </>;
};
const CardWithImageOverlay = () => {
  return <>
      <div className="card text-white">
        <Card.Img src={cardImg7.src} alt="" />
        <Card.ImgOverlay>
          <Card.Title as="h5" className="text-white">
            Card title
          </Card.Title>
          <div className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </div>
          <div className="card-text">
            <small>Last updated 3 mins ago</small>
          </div>
        </Card.ImgOverlay>
      </div>
    </>;
};
const ColoredCards = () => {
  const colors = ["primary", "success", "info", "warning", "danger", "purple", "pink", "dark"];
  return <>
      <div className="col-md-4">
        <div className="card text-white bg-secondary">
          <div className="card-body">
            <h5 className="card-title text-white">
              Special title treatment
            </h5>
            <div className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </div>
            <Link href="" className="btn btn-light btn-sm waves-effect">
              Button
            </Link>
          </div>
        </div>
      </div>
      {(colors || []).map((color, index) => {
      return <div className="col-md-4" key={index}>
            <div className={classNames("card", "text-white", "text-xs-center", `bg-${color}`)}>
              <div className="card-body">
                <blockquote className="card-bodyquote mb-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer className="blockquote-footer text-white">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>;
    })}
    </>;
};
const ColoredTextCards = ({
  color,
  name
}) => {
  return <div className="card">
      <div className={classNames('card-body', "text-" + color)}>
        <h5 className="card-title">{name} card title</h5>
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </div>
      </div>
    </div>;
};
const BorderdCards = () => {
  const colors = [{
    variant: "primary",
    name: "Primary"
  }, {
    variant: "secondary",
    name: "Secondary"
  }, {
    variant: "success",
    name: "Success"
  }, {
    variant: "danger",
    name: "Danger"
  }];
  return <>
      {(colors || []).map((item, index) => {
      return <div className="col-lg-3 col-md-6" key={index}>
            <div className={classNames("card", "border", `border-${item.variant}`, "mb-4")}>
              <div className="card-header">Header</div>
              <div className={classNames('card-body', `text-${item.variant}`)}>
                <h5 className="card-title">{item.name} card title</h5>
                <div className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </div>
              </div>
            </div>
          </div>;
    })}
    </>;
};
const BackGroundCards = () => {
  const colors = [{
    variant: "primary",
    name: "Primary"
  }, {
    variant: "secondary",
    name: "Secondary"
  }, {
    variant: "success",
    name: "Success"
  }, {
    variant: "danger",
    name: "Danger"
  }];
  return <>
      {(colors || []).map((item, index) => {
      return <div className="col-lg-3 col-md-6" key={index}>
            <div className={classNames("card", "text-white", `bg-${item.variant}`, "mb-3")}>
              <div className={classNames('card-header', `bg-${item.variant}`)}>
                Header
              </div>
              <div className="card-body">
                <Card.Title as="h5" className="text-white">
                  {item.name} card title
                </Card.Title>
                <div className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </div>
              </div>
            </div>
          </div>;
    })}
    </>;
};
const HorizontalCards = () => {
  return <>
      <div className="col-lg-6">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <Image src={cardImg2.src} className="card-img img-fluid" alt="" width={264} height={176} />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <div className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </div>
                <div className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <div className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </div>
                <div className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Card.Img src={cardImg5.src} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </>;
};
const CardWithGroup = ({
  item
}) => {
  return <div className="card">
      <Card.Img src={item.image.src} />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <div className="card-text">{item.text}</div>
        <div className="card-text">
          <small className="text-muted">{item.subtext}</small>
        </div>
      </div>
    </div>;
};
const CardsWithNavigation = ({
  variant
}) => {
  return <>
      <div className="card text-center">
        <div className="card-header">
          <Nav as="ul" variant={variant} defaultActiveKey="#first" className={`card-header-${variant}`}>
            <Nav.Item as="li">
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <div className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </div>
          <Button variant="primary">Go somewhere</Button>
        </div>
      </div>
    </>;
};
const GridCards = () => {
  return <>
      <div className="col">
        <div className="card">
          <Card.Img src={cardImg2.src} variant="top" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <div className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card">
          <Card.Img src={cardImg6.src} variant="top" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <div className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card">
          <Card.Img src={cardImg5.src} variant="top" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <div className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content.
            </div>
          </div>
        </div>
      </div>
    </>;
};
const AllCards = () => {
  const CardGroupDetails = [{
    id: 1,
    image: cardImg,
    title: "Card title",
    text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    subtext: "Last updated 3 mins ago"
  }, {
    id: 2,
    image: cardImg3,
    title: "Card title",
    text: "This card has supporting text below as a natural lead-in to additional content.",
    subtext: "Last updated 3 mins ago"
  }, {
    id: 3,
    image: cardImg4,
    title: "Card title",
    text: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
    subtext: "Last updated 3 mins ago"
  }];
  return <>
      <div className="row">
        <div className="col-lg-6 col-xl-3">
          <CardWithImage />
        </div>

        <div className="col-lg-6 col-xl-3">
          <CardWithImage2 />
        </div>

        <div className="col-lg-6 col-xl-3">
          <CardWithImage3 />
        </div>

        <div className="col-lg-6 col-xl-3">
          <CardWithTitleAndImage />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <CardWithSpecialTitle />
        </div>
        <div className="col-lg-6">
          <CardWithSpecialTitle />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <CardWithSpecialTitle />
        </div>
        <div className="col-lg-4">
          <CardWithSpecialTitle />
        </div>
        <div className="col-lg-4">
          <CardWithSpecialTitle />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <CardWithHeader />
        </div>

        <div className="col-md-4">
          <CardWithHeaderAndQuote />
        </div>

        <div className="col-md-4">
          <CardWithHeaderAndFooter />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <CardWithImageCaps position={"top"} image={cardImg5} />
        </div>

        <div className="col-md-4">
          <CardWithImageCaps position={"bottom"} image={cardImg6} />
        </div>

        <div className="col-md-4">
          <CardWithImageOverlay />
        </div>
      </div>

      <div className="row">
        <ColoredCards />
      </div>

      <div className="row">
        <div className="col-md-4">
          <ColoredTextCards color={"primary"} name={"Primary"} />
        </div>

        <div className="col-md-4">
          <ColoredTextCards color={"secondary"} name={"Secondary"} />
        </div>

        <div className="col-md-4">
          <ColoredTextCards color={"success"} name={"Success"} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <h4 className="mb-3">Card Border</h4>
        </div>
        <BorderdCards />
      </div>

      <div className="row">
        <div className="col-xs-12">
          <h4 className="mb-3">Background and color</h4>
        </div>
        <BackGroundCards />
      </div>

      <div className="row">
        <div className="col-xs-12">
          <h4 className="mb-3">Card Horizontal</h4>
        </div>
        <HorizontalCards />
      </div>

      <div className="row">
        <div className="col-xs-12">
          <h4 className="mb-4">Card Group</h4>

          <CardGroup>
            {(CardGroupDetails || []).map((item, index) => {
            return <CardWithGroup item={item} key={index} />;
          })}
          </CardGroup>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-xs-12">
          <h4 className="mb-3">Grid Cards</h4>
          <div className="row-cols-1 row-cols-md-3 g-3 row">
            <GridCards />
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-xs-12">
          <h4 className="mb-3">Navigation</h4>
          <div className="row">
            <div className="col-md-6">
              <CardsWithNavigation variant={"tabs"} />
            </div>
            <div className="col-md-6">
              <CardsWithNavigation variant={"pills"} />
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default AllCards;