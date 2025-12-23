"use client"
import React, {useState} from "react";
import Link from "next/link";
import {Button, Col, Row} from "react-bootstrap";
import ContactDetails from "./ContactDetails";
import AddMember from "./AddMember";

//dummy data
import {contacts as data, ContactsItemTypes} from "./data";

const ContactList = () => {
    const [contacts, setContacts] = useState<ContactsItemTypes[]>(data);
    const [show, setShow] = useState<boolean>(false);

    /*
     * search on data
     */
    const onSearchData = (value: string) => {
        if (value === "") setContacts(data);
        else {
            let modifiedProducts = data;
            modifiedProducts = modifiedProducts.filter((item) =>
                item.name.toLowerCase().includes(value)
            );
            setContacts(modifiedProducts);
        }
    };

    /*
     *   modal handeling
     */
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => setShow(true);

    /*
      handle form submission
      */
    const onSubmit = () => {
        onCloseModal();
    };
    return (
        <>
            <Row className="mb-2">
                <Col sm={4}>
                    <Link href="" className="btn btn-danger mb-2" onClick={onOpenModal}>
                        <i className="mdi mdi-plus-circle me-2"></i> Add New
                    </Link>
                </Col>
                <Col sm={8}>
                    <div>
                        <form className="d-flex align-items-start flex-wrap justify-content-sm-end">
                            <div className="d-flex align-items-start flex-wrap me-2">
                                <label htmlFor="membersearch-input" className="visually-hidden">
                                    Search
                                </label>
                                <input
                                    type="search"
                                    className="form-control"
                                    id="membersearch-input"
                                    placeholder="Search..."
                                    onChange={(e: any) => onSearchData(e.target.value)}
                                />
                            </div>
                            <Button variant="success" className="mb-2 mb-sm-0">
                                <i className="mdi mdi-cog"></i>
                            </Button>
                        </form>
                    </div>
                </Col>
            </Row>

            <ContactDetails contacts={contacts}/>
            <AddMember show={show} onHide={onCloseModal} onSubmit={onSubmit}/>

        </>
    )
}

export default ContactList