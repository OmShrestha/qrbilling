import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    categoryCardContainer: {
        backgroundColor: theme.palette.secondary.gray,
        display: 'flex',
        justifyContent: 'center'
    },
    categoryCard: {
        margin: 10,
        height: 130,
        width: 130,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: 'relative',
        boxSizing: 'border-box',
    },
    imageOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.65,
        backgroundColor: theme.palette.secondary.dark,
        zIndex: 10,
        borderRadius: 20,
    },
    categoryImage: {
        objectFit: 'cover',
        height: '100%',
        width: '100%',
        zIndex: 5,
        borderRadius: 20,
    },
    categoryName: {
        position: 'absolute',
        color: theme.palette.secondary.main,
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 10,
        fontFamily: "SF Pro Display",
    },
    '@media (min-width: 365px)': {
        categoryCard: {
            height: 162,
            width: 162,
        },
        categoryName: {
            fontSize: 20,
            fontWeight: 'bold',
        }
    },
    '@media (min-width: 600px)': {
        /* For tablets: */
        categoryName: {
            fontSize: '40px',
            fontWeight: 'bold',
        },
        categoryCard: {
            height: 300,
            width: 275,
        },
    }

}))

export default styles