import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url("https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg")`,
        backgroundColor: theme.palette.secondary.gray,
    },
    secondRoot: {
        padding: "18px 0",
        backgroundColor: theme.palette.secondary.main,
        height: "0vh",
        display: "flex",
        flexDirection: "column",
    },
    searchBarTitle: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 500,
        opacity: 0.7,
        fontFamily: 'SF Pro Display'
    },
    tabs: {
        backgroundColor: theme.palette.secondary.main,
        height:'auto',
        "&.MuiTab-textColorInherit.Mui-selected": {
            color: theme.palette.primary.main,
        },
    },
    tab: {
        backgroundColor: theme.palette.secondary.gray,
        borderRadius: 40,
        margin: '0px 10px',
        padding: '14px 18px',
        fontWeight: 600,
        fontSize: 12,
        fontFamily: "Poppins",
    },
    product: {
        padding: "none",
    },
    orderBtn: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
        padding: "8px 16px",
        "&:hover, &:focus": {
            outline: "none",
            backgroundColor: theme.palette.primary.main,
        },
    },
    accordian: {
        backgroundColor: theme.palette.secondary.gray,
        '& .MuiAccordionDetails-root': {
            padding: 0
        }
    },
    heading: {
        opacity: 0.75,
        fontWeight: 500,
    },
    orderBtnContainer: {
        position: "fixed",
        width: 150,
        justifyContent: "center",
        margin: '0px auto',
        bottom: 20,
        "& .MuiCollapse-container": {
            flex: "1 0 auto",
        },
        zIndex: 999,
        left: 0,
        right: 0
    },
    spinner: {
        justifyContent: "center",
        margin: '0px auto',
        left: 0,
        right: 0
    },
    list_item:{
        minHeight:'67px',
    }

}));

export default useStyles;