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
    checkoutContainer: {
        width: "100%",
        backgroundColor: "#4EA23A",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        padding: "9px 20px",
        bottom: 0,
    },
    totalPrice: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 700,
    },
    checkout: {
        border: "1px solid black",
        borderRadius: "10px",
        fontSize: "14px",
        backgroundColor: "#ECECEC !important",
    },
    product: {
        padding: "none",
    },
    panel: {
        backgroundColor: "#ECECEC !important",
        paddingBottom: "65px",
        "&.MuiBox-root-15": {
            padding: "0",
        },
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
        justifyContent: "center",
        bottom: 20,
        "& .MuiCollapse-container": {
            flex: "1 0 auto",
        },
    },
    total: {
        color: "white",
        fontSize: "14px",
        lineHeight: "14px",
    },
    viewTxt: {
        color: "#273238",
    },
    accordian: {
        backgroundColor: '#ECECEC',
        '& .MuiAccordionDetails-root': {
            padding: 0
        }
    }
}));

export default useStyles;