import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    categoryCardContainer: {
        backgroundColor: "#ECECEC",
    },
    categoryCard: {
        margin: 10,
        height: 162,
        width: 162,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: 'relative',
        boxSizing: 'border-box'
    },
    imageOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.65,
        backgroundColor: '#000',
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
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        zIndex: 10,
    },
}))

export default styles