import React from "react";
import {Metadata} from "next";
import dynamic from "next/dynamic";
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// dummy data
import {skills} from "./data";
import {Col, Row} from "react-bootstrap";

const UserBox = dynamic(() => import('./UserBox'))
const Skills = dynamic(() => import('./Skills'))
const UserProfile = dynamic(() => import('./UserProfile'))

export const metadata: Metadata = {
    title: "Profile",
}

const Profile = () => {
    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    {label: "Contacts", path: "/apps/contacts/profile"},
                    {label: "Profile", path: "/apps/contacts/profile", active: true},
                ]}
                title={"Profile"}
            />
            <Row>
                <Col xl={4} lg={4}>
                    {/* User information */}
                    <UserBox/>

                    {/* User's skills */}
                    <Skills skills={skills}/>
                </Col>

                <Col xl={8} lg={8}>
                    <UserProfile/>
                </Col>
            </Row>
        </>
    );
};

export default Profile;
