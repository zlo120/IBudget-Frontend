import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import AppRoot from './app/roots/root';

const createRouter = (queryClient: QueryClient) => 
    createBrowserRouter([
        {
            path: '/',
            element: (
                <AppRoot />
            ),
            children: [
                {
                    index: true,
                    path: '/',
                    lazy: async () => {
                        const { Search } = await import('./app/search');
                        return { Component: Search };
                    },
                },
                {
                    path: '/search',
                    lazy: async () => {
                        const { Search } = await import('./app/search');
                        return { Component: Search };
                    },
                },
                {
                    path: 'thismonth',
                    lazy: async () => {
                        const { ThisMonth } = await import('./app/thismonth');
                        return { Component: ThisMonth };
                    },
                },
                {
                    path: 'uploadcsv',
                    lazy: async () => {
                        const { UploadCSV } = await import('./app/uploadcsv');
                        return { Component: UploadCSV };
                    },
                },
            ]
        }
    ]);

export default createRouter;