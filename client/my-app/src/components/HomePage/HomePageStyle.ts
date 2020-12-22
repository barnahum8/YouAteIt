import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginRight: '5%',
        marginTop: '2%',
    },  
    username: {
        marginTop: '2%',
        width: '30%',
        flex: 1,
        display: "inline-flex",
        justifyContent: "flex-end",
        marginLeft:"5%"
    },  
    hello: {
        marginLeft: '5%',
    },    
    comp: {
        marginTop: '15%',
        direction: "ltr"
    },    
    logo: {
        marginRight: '2%',
        marginTop: '1%',
    },
    logoutbtn: {
        direction: "ltr",
    },
}));

export default useStyles;