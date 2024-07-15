import { makeStyles } from 'tss-react/mui';
import theme from '../../../../theme';

const styles = makeStyles()(() => ({
    submitContainer : {
        width: "100%",
    },
    submit : {
        marginTop: "10px",
        float: "right"
    },
    // Page 1
    uploadWidgetContainer : {
        width: "100%",
        height: "100%"
    },
    uploadWidget : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },

    // Page 2
    tagDataContainer : {
        display: "flex",
        marginTop: "20px",
    },
    tagDataObjectContainer : {
        width: "40%",
        // backgroundColor: theme.palette.primary.dark,
        margin: "0 50px 0 50px",
    },
    createRuleContainer : {
        display: "flex",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
    },    
    icon: {
        color: theme.palette.grey[600],
        maxWidth: "20px",
    },    
    formItem : {
        width: "100%",
    }
}));

export default styles;