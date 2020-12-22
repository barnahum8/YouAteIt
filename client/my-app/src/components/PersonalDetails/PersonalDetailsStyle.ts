import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    field: {
        marginTop: '3%',
        paddingLeft: '2%',
    },
    
    dateandbeer: {
        display: "flex",
        marginTop: '5%',
        width: '100%',
    },

    beer:{
        marginTop: "2%",
        display:"flex"
    },
    
    selectform: {
        width: '30%',
        marginRight: '5%',
        marginTop: "-2%",
    },
    
    label: {
        marginTop: '3%',
        marginLeft: '1%',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    
    fullpage: {
        marginRight: '2%',
    },

    formflex: {
        display:"flex"
    }
}));

export default useStyles;