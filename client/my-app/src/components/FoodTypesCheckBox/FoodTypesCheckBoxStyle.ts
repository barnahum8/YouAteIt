import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    fullpage: {
        marginRight: '2%',
        overflowY:'auto',
        overflowX:'hidden',
        width: '100%',
        height: '60vh',
    },
    newtype: {
        width: '30vh',
        marginRight: '-35%',
    }
}));

export default useStyles;