import Navbar from "../ui/navbar/navbar";
import Sidebar from "../ui/sidebar/sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Toolbar } from "@mui/material";

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <Box sx={{display: 'flex'}}>
            <Navbar />
            <Sidebar />
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
};

export default MainLayout;