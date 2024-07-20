import styles from './sidebar.styles';
import { Search, CalendarToday, UploadFile, FmdBad } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const useStyles = styles;
const drawerWidth = 240;
const getIcon = (index: number) => {
    switch(index) {
        case 0:
            return (<Search />);
        case 1:
            return (<UploadFile />);
        case 2:
            return (<CalendarToday />);
        case 3:
            return (<LocalOfferIcon />);
        default:
            return (<FmdBad />);
    }
}
const getHref = (index: number) => {
    switch(index) {
        case 0:
            return "/search";
        case 1:
            return "/uploadcsv";
        case 2:
            return "/thismonth";
        case 3:
            return "/managetags";
        default:
            return "/search";
    }
}
const sideBarItems = ['Search', 'Upload CSV', 'This Month', 'Manage Tags'];
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