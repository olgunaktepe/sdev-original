import dynamic from "next/dynamic";
const AllCards = dynamic(() => import('./AllCards'))
import PageBreadcrumb from "@/components/PageBreadcrumb";

// components
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cards",
}

const Cards = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/cards" },
          { label: "Cards", path: "/ui/cards", active: true },
        ]}
        title={"Cards"}
      />
      <AllCards />
    </>
  );
};

export default Cards;
