'use client';
import {HttpLink } from '@apollo/client';
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import {setContext} from "@apollo/client/link/context";
import {PropsWithChildren} from "react";

const uri = "https://project-api-jade.vercel.app/api/graphql";

const makeClient = () => {
    const httpLink = new HttpLink({
        uri,
        fetchOptions: { cache: 'no-store' },
    });

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                ...headers,
                authorization: token ?? '',
            },
        };
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    });
};

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};