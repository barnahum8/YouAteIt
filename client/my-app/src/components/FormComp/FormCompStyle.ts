import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    mainbar: {
        direction: 'rtl',
    },
    tabpanel: {
        width: '60%',
        float: 'right',
        backgroundColor: 'gainsboro',
        height: '60vh',
    }
}));

export default useStyles;