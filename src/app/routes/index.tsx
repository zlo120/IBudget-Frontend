import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import AppRoot from './app/root';

const createRouter = (queryClient: QueryClient) => 
    createBrowserRouter([
        {
            path: '/app',
            element: (
                <AppRoot />
            ),
            children: [
                {
                    path: 'dashboard',
                    lazy: async () => {
                        const { Dashboard } = await import('./app/dashboard');
                        return { Component: Dashboard };
                    },
                },
            ]
        }
    ]);

export default createRouter;