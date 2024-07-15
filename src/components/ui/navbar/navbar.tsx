import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import HelpOutline from '@mui/icons-material/HelpOutline';
import { Settings } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import styles from './navbar.styles';

const useStyles = styles;
const Navbar = () => {
    const { classes } = useStyles();
    return (
        <AppBar 
            position="fixed" 
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
            className={`${classes.root}`}>
        <Toolbar>
            <Icon>                
                <Link href="/" style={{color: "#fff", textDecoration: "none"}}>
                    <RequestQuoteIcon />
                </Link>
            </Icon>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link href="/" style={{color: "#fff", textDecoration: "none"}}>
                    IBudget
                </Link>
            </Typography>   
            <div className={`${classes.iconSection}`}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 1 }}
                >
                    <HelpOutline />
                </IconButton>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 1 }}
                >
                    <Settings />
                </IconButton>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 1 }}
                >
                    <Avatar sx={{ bgcolor: grey[500] }}>ZL</Avatar>
                </IconButton>
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;