import { Outlet } from 'react-router-dom';
import MainLayout from '../../../../components/layouts/main-layout';

const FinancialRoot = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

export default FinancialRoot;