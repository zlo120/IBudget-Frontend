import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from '../lib/react-query';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({children}: AppProviderProps) => {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </HelmetProvider>
    )
}