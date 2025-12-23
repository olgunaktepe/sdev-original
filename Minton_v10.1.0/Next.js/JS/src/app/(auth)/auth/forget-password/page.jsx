"use client";

import React from "react";
import { Button } from "react-bootstrap";

// components
import { FormInput } from "@/components/Form";
import { AuthLayout } from "@/components";
import Link from "next/link";

/* bottom link */
const BottomLink = () => {
  return <div className="row mt-3">
            <div className="col text-center">
                <p className="text-muted">
                    Back to{" "}
                    <Link href={"/auth/login"} className="text-primary fw-medium ms-1">
                        Log in
                    </Link>
                </p>
            </div>
        </div>;
};
const ForgetPassword = () => {
  return <>
            <AuthLayout helpText="Enter your email address and we'll send you an email with instructions to reset your password." bottomLinks={<BottomLink />}>
                <form>
                    <FormInput label="Email address" type="email" name="email" placeholder="Enter your email" containerClass={"mb-3"} />

                    <div className="d-grid text-center">
                        <Button type="submit">
                            Reset Password
                        </Button>
                    </div>
                </form>

            </AuthLayout>
        </>;
};
export default ForgetPassword;