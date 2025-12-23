"use client";
import React from "react";
import {Button, Nav, Tab} from "react-bootstrap";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

// components
import {FormInput} from "@/components/Form/";

import {AuthLayout2, SocialLinks} from "@/components";
import Link from "next/link";


/* bottom link */
const BottomLink = () => {

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {new Date().getFullYear()} - © Minton theme by{" "}
                <Link href="https://coderthemes.com/" className="text-dark" target="_blank">
                    Coderthemes
                </Link>
            </p>
        </footer>
    );
};

const SignInSignUp2 = () => {

    /*
      form validation schema
      */
    const loginSchema = yupResolver(
        yup.object().shape({
            loginemail: yup
                .string()
                .required("Please enter email")
                .email("Please enter valid Email"),
            loginpassword: yup.string().required("Please enter Password"),
        })
    );

    const signUpSchema = yupResolver(
        yup.object().shape({
            password: yup.string().required("Please enter Password"),
            fullname: yup.string().required("Please enter Fullname"),
            email: yup
                .string()
                .required("Please enter Email")
                .email("Please enter valid Email"),
        })
    );

    return (
        <>
            <AuthLayout2 isCombineForm={true} bottomLinks={<BottomLink/>}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="login">
                    <Nav variant="tabs" className="nav-bordered">
                        <Nav.Item as="li">
                            <Nav.Link eventKey="login" className="cursor-pointer">
                                Log In
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="signup" className="cursor-pointer">
                                Sign Up
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        {/* login form */}
                        <Tab.Pane eventKey="login">
                            <p className="text-muted mb-3">

                                Enter your email address and password to access admin panel.

                            </p>


                            <form>
                                <FormInput
                                    label="Email address"
                                    type="text"
                                    name="loginemail"
                                    placeholder="Enter your email"
                                    containerClass={"mb-2"}
                                />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    name="loginpassword"
                                    placeholder="Enter your password"
                                    containerClass={"mb-2"}
                                >
                                    <Link
                                        href="/auth/forget-password"
                                        className="text-muted float-end"
                                    >
                                        <small>Forgot your password?</small>
                                    </Link>
                                </FormInput>

                                <FormInput
                                    label="Remember me"
                                    type="checkbox"
                                    name="checkbox"
                                    containerClass={"mb-3"}
                                />

                                <div className="d-grid mb-0 text-center">
                                    <Button variant="primary" type="submit">
                                        Log In
                                    </Button>
                                </div>

                                {/* social links */}
                                <div className="text-center mt-4">
                                    <h5 className="mt-3 text-muted">Sign in with</h5>
                                    <SocialLinks/>
                                </div>
                            </form>
                        </Tab.Pane>

                        {/* sign up form */}
                        <Tab.Pane eventKey="signup">
                            <p className="text-muted mb-3">

                                Don&apos;t have an account? Create your own account, it takes less than a minute

                            </p>
                            <form>
                                <FormInput
                                    label="Full Name"
                                    type="text"
                                    name="fullname"
                                    placeholder="Enter your name"
                                    containerClass={"mb-2"}
                                />
                                <FormInput
                                    label="Email address"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    containerClass={"mb-2"}
                                />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    containerClass={"mb-2"}
                                />
                                <FormInput
                                    label="I accept Terms and Conditions"
                                    type="checkbox"
                                    name="checkboxsignup"
                                    containerClass={"mb-3"}
                                />

                                <div className="mb-0 d-grid text-center">
                                    <Button variant="primary" type="submit">
                                        Sign Up
                                    </Button>
                                </div>

                                {/* social links */}
                                <div className="text-center mt-4">
                                    <h5 className="mt-3 text-muted">Sign Up using</h5>
                                    <SocialLinks/>
                                </div>
                            </form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </AuthLayout2>
        </>
    );
};

export default SignInSignUp2;
