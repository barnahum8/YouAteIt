import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        float: 'right',
        marginRight: '5%',
        marginTop: '2%',
    },  
    username: {
        float: 'left',
        marginTop: '2%',
        width: '30%',
    },  
    hello: {
        float: 'right',
        marginLeft: '5%',
    },    
    comp: {
        marginTop: '15%',
    },    
    logo: {
        float: 'right',
        marginRight: '2%',
        marginTop: '1%',
    },
}));

export default useStyles;