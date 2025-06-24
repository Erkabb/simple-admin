'use client';
import {ReactNode, useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { useLoginMutation } from '@/gql/auth/auth.generated';

// import {useRouter} from "next/router";

import { createContext } from 'react';
// import {usePathname} from "next/navigation";

export interface AuthContextValue {
    isAuth: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const AuthConsumer = AuthContext.Consumer;


export function AuthProvider({ children }: { children: ReactNode }) {
    // const client = useApolloClient();
    const [isAuth, setAuth] = useState(false);

    const client = useApolloClient();
    const [loginMutation] = useLoginMutation();
    // const router = useRouter();
    // const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setAuth(!!token);
    }, []);

    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('order');
        setAuth(false);
        await client.resetStore().then(() => toast.success(`Account logged out`));
    };

    const login = async (email: string, password: string) => {
        const { data } = await loginMutation({
            variables: {
                input: { email, password }
            }
        });
        if (data?.login?.token) {
            localStorage.setItem('token', data.login.token);
            setAuth(true);
            await client.resetStore();
            toast.success('Welcome Back');
        } else {
            throw new Error('Login failed');
        }
    };
 
    return <AuthContext.Provider value={{ isAuth, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
