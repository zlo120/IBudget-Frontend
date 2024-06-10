import { makeStyles } from 'tss-react/mui';
import theme from '../../../theme';

const styles = makeStyles()(() => ({
    root : {
        backgroundColor : "#0C6D3F"
    },
    iconSection : {
        margin: "0 1.2rem 0 1.2rem"
    },
    wipHeader : {
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.grey[800],
        padding: 'none',
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem',
        cursor: 'pointer',
        alignItems: 'center',
    },
}));

export default styles;