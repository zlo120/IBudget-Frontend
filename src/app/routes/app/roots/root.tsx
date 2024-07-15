import { Outlet } from 'react-router-dom';
import MainLayout from '../../../../components/layouts/main-layout';

const AppRoot = () => {
  return (
    <MainLayout>
        <Outlet />
    </MainLayout>
  );
};

export default AppRoot;