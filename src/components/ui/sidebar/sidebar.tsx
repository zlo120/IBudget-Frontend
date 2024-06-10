import styles from './sidebar.styles';
import { SpaceDashboardOutlined, Search, FormatAlignLeft, CalendarToday, Event, UploadFile, FmdBad } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const useStyles = styles;
const drawerWidth = 240;
const getIcon = (index: number) => {
    switch(index) {
        case 0:
            return (<SpaceDashboardOutlined />);
        case 1:
            return (<Search />);
        case 2:
            return (<FormatAlignLeft />);
        case 3:
            return (<CalendarToday />);
        case 4:
            return (<Event />);
        case 5:
            return (<UploadFile />);
        default:
            return (<FmdBad />);
    }
}
const getHref = (index: number) => {
    switch(index) {
        case 0:
            return "/app/dashboard";
        case 1:
            return "/app/search";
        case 2:
            return "/app/mybudget";
        case 3:
            return "/app/monthlysummary";
        case 4:
            return "/app/thisweek";
        case 5:
            return "/app/uploadcsv";
        default:
            return "/app/dashboard";
    }
}
const sideBarItems = ['Dashboard', 'Search', 'My Budget', 'Monthly Summary', 'This Week', 'Upload CSV'];
const drawer = (
    <Box sx={{overflow: "auto"}}>
        <List>
        {sideBarItems.map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton href={getHref(index)}>
                    <ListItemIcon>
                        {getIcon(index)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        ))}
        </List>
    </Box>
);

const Sidebar = () => {
    const { classes } = useStyles();
    return (
        <>
            <Drawer                
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                {drawer}
            </Drawer>
        </>
    )
}

export default Sidebar;