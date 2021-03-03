import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    root: {
        '& .MuiTabs-indicator': {
            display: 'none',
            color: theme.palette.secondary.main
        }
    }
}))

export default styles;