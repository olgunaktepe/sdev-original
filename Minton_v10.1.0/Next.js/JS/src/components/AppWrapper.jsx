'use client';

import { LayoutProvider } from "@/context/useLayoutContext";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/useAuthContext";
const AppWrapper = ({
  children
}) => {
  return <SessionProvider>
            <LayoutProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </LayoutProvider>
        </SessionProvider>;
};
export default AppWrapper;