"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {Button} from "react-bootstrap";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormInput} from "@/components/Form";
import {AuthLayout, SocialLinks} from "@/components";
import {useForm} from "react-hook-form";

/* bottom links */
const BottomLink = () => {

    return (
        <div className="row mt-3">
            <div className="col-xs-12 text-center">
                <p className="text-muted">
                    <Link href="/auth/forget-password" className="text-muted ms-1">
                        Forgot your password?
                    </Link>
                </p>
                <p className="text-muted">
                    Don&apos;t have an account?
                    <Link href="/auth/register" className="text-primary fw-bold ms-1">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

const Login = () => {

    const [loading, setLoading] = useState(false);
    const {push} = useRouter();

    const loginFormSchema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Please enter your email"),
        password: yup.string().required("Please enter your password"),
    });

    const {control, handleSubmit} = useForm({
        resolver: yupResolver(loginFormSchema),
        defaultValues: {
            email: "user@demo.com",
            password: "123456",
        },
    });

    type LoginFormFields = yup.InferType<typeof loginFormSchema>;

    const login = handleSubmit(async (values: LoginFormFields) => {
        setLoading(true);
        signIn("credentials", {
            redirect: false,
            email: values?.email,
            password: values?.password,
        }).then((res) => {
            if (res?.ok) {
                push("/");
            } else {
                console.log(res?.error);
            }
        });
        setLoading(false);
    });

    return (
        <AuthLayout
            helpText="Enter your email address and password to access admin panel."
            bottomLinks={<BottomLink/>}
        >

            <form onSubmit={login}>
                <FormInput
                    type="email"
                    name="email"
                    label="Email address"
                    placeholder="user@coderthemes.com"
                    containerClass={"mb-2"}
                    control={control}
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    containerClass={"mb-2"}
                    control={control}
                ></FormInput>

                <FormInput
                    type="checkbox"
                    name="checkbox"
                    label="Remember me"
                    containerClass={"mb-3"}
                    defaultChecked
                    control={control}
                />

                <div className="text-center d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                        Log In
                    </Button>
                </div>
            </form>

            <div className="text-center">
                <h5 className="mt-3 text-muted">Sign in with</h5>
                <SocialLinks/>
            </div>
        </AuthLayout>
    );
};

export default Login;
