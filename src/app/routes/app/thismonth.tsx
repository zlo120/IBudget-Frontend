import { Typography } from "@mui/material"
import { makeStyles } from 'tss-react/mui';
import theme from "../../../theme";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PaymentsIcon from '@mui/icons-material/Payments';
import TimelineIcon from '@mui/icons-material/Timeline';


const useStyles = makeStyles()(() => ({
    container: {
        display: 'flex',        
    },
    object: {
        width: "100%",        
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        width: "340px",
        height: "170px",
        borderRadius: "15px",
        backgroundColor: theme.palette.grey[100],
        margin: "5px",
    }
}));

export const ThisMonth = () => {
    const {classes} = useStyles();
    return (        
        <>
            <Typography variant="h4">This Month</Typography>
            <div className={`${classes.container}`}>
                <div className={`${classes.object}`}>
                    <Card className={`${classes.card}`}>
                        <CardContent>
                            <BusinessCenterIcon />
                            <Typography variant="h6">Total Spent</Typography>
                            <Typography variant="h4">$9,999</Typography>
                        </CardContent>
                    </Card>
                    <Card className={`${classes.card}`}>
                        <CardContent>
                            <PaymentsIcon />
                            <Typography variant="h6">Total Income</Typography>
                            <Typography variant="h4">$9</Typography>
                        </CardContent>
                    </Card>
                    <Card className={`${classes.card}`}>
                        <CardContent>
                            <TimelineIcon />
                            <Typography variant="h6">Total Spent on Food</Typography>
                            <Typography variant="h4">$999,999</Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className={`${classes.object}`}>
                    <Typography variant="h6">Pretend this is a graph...</Typography>
                </div>
            </div>
        </>
    )
}