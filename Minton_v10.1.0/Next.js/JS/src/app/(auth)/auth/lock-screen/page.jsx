"use client";

import React from "react";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { VerticalForm, FormInput } from "@/components/Form";
import { AuthLayout } from "@/components";

// images
import userImg from "@/assets/images/users/avatar-1.jpg";
import Link from "next/link";
import Image from "next/image";
/* bottom link */
const BottomLink = () => {
  return <div className="row mt-3">
      <div className="col-xs-12 text-center">
        <p className="text-muted">
          Not you? return{" "}
          <Link href={"/auth/login"} className="text-primary fw-medium ms-1">
            <b>Sign In</b>
          </Link>
        </p>
      </div>
    </div>;
};
const LockScreen = () => {
  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(yup.object().shape({
    password: yup.string().required("Please enter Password")
  }));
  return <>
      <AuthLayout bottomLinks={<BottomLink />}>
        <div className="text-center w-75 m-auto mt-4">
          <Image src={userImg} alt="" className="rounded-circle avatar-lg img-thumbnail" height={72} width={72} />
          <h4 className="text-dark-50 text-center mt-3">
            Hi ! Nik Patel 
          </h4>
          <p className="text-muted mb-4">
            Enter your password to access the admin.
          </p>
        </div>
        <VerticalForm onSubmit={() => {}} resolver={schemaResolver}>
          <FormInput label="Password" type="password" name="password" placeholder="Enter your password" containerClass={"mb-3"} />

          <div className="d-grid text-center">
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>;
};
export default LockScreen;