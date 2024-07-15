import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import AppRoot from './app/roots/root';
import FinancialRoot from './app/roots/financialroot';

const createRouter = (queryClient: QueryClient) => 
    createBrowserRouter([
        {
            path: '/app',
            element: (
                <AppRoot />
            ),
            children: [
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
                {
                    path: "financial",
                    element: (
                        <FinancialRoot />
                    ),
                    children: [
                        {
                            path: "income",
                            lazy: async () => {
                                const { AddIncome } = await import('./app/addincome');
                                return { Component: AddIncome };
                            }
                        },
                        {
                            path: "expense",
                            lazy: async () => {
                                const { AddExpense } = await import('./app/addexpense');
                                return { Component: AddExpense };
                            }
                        }
                    ]
                }
            ]
        }
    ]);

export default createRouter;