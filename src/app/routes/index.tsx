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
                {
                    path: 'search',
                    lazy: async () => {
                        const { Search } = await import('./app/search');
                        return { Component: Search };
                    },
                },
                {
                    path: 'mybudget',
                    lazy: async () => {
                        const { MyBudget } = await import('./app/mybudget');
                        return { Component: MyBudget };
                    },
                },
                {
                    path: 'monthlysummary',
                    lazy: async () => {
                        const { MonthlySummary } = await import('./app/monthlysummary');
                        return { Component: MonthlySummary };
                    },
                },
                {
                    path: 'thisweek',
                    lazy: async () => {
                        const { ThisWeek } = await import('./app/thisweek');
                        return { Component: ThisWeek };
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