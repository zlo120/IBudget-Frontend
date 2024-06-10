import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './main-provider';

import createRouter from './routes/index';
const AppRouter = () => {
    const queryClient = useQueryClient();
    const router = useMemo(() => createRouter(queryClient), [queryClient]);
    return <RouterProvider router={router} />;
}

const App = () => { 
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}

export default App;