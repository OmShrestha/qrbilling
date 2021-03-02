import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url("https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg")`,
        backgroundColor: "#ECECEC",
    },
    secondRoot: {
        padding: "18px 0",
        backgroundColor: "#fff",
        height: "73vh",
        display: "flex",
        flexDirection: "column",
    },
    searchBarTitle: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 700
    },
    tabs: {
        backgroundColor: "#fff",
        "&.MuiTab-textColorInherit.Mui-selected": {
            color: "#a62a22",
        },
    },
    tab: {
        backgroundColor: '#ECECEC',
        borderRadius: 40,
        margin: '0px 10px',
        padding: '14px 18px'
    },
    product: {
        padding: "none",
    },
    orderBtn: {
        color: "white",
        backgroundColor: "#A62A22",
        borderRadius: "10px",
        padding: "8px 16px",
        "&:hover, &:focus": {
            outline: "none",
            backgroundColor: "#A62A22",
        },
    },
    orderBtnContainer: {
        position: "fixed",
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#A62A22',
        justifyContent: "center",
        bottom: 50,
        "& .MuiCollapse-container": {
            flex: "1 0 auto",
        },
    },
    accordian: {
        backgroundColor: '#ECECEC',
        '& .MuiAccordionDetails-root': {
            padding: 0
        }
    }
}));

export default useStyles;