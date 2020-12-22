import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    field: {
        marginTop: '3%',
        float: 'right',
        paddingLeft: '2%',
    },
    
    dateandbeer: {
        float: 'right',
        marginTop: '5%',
        width: '100%',
    },
    
    selectform: {
        float: 'right',
        width: '25%',
        marginRight: '2%',
    },
    
    label: {
        float: 'right',
        marginTop: '3%',
        marginLeft: '1%',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    
    fullpage: {
        marginRight: '2%',
    }
}));

export default useStyles;