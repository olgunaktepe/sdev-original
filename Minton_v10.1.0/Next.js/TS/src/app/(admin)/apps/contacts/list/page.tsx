import React from "react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import {Metadata} from "next";
import ContactList from "@/app/(admin)/apps/contacts/list/ContactList";

export const metadata: Metadata = {
    title: "Members List",
}
const List = () => {

    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    {label: "Contacts", path: "/apps/contacts/list"},
                    {label: "Members List", path: "/apps/contacts/list", active: true},
                ]}
                title={"Members List"}
            />
            <ContactList/>
        </>
    );
};

export default List;
