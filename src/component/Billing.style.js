import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url("https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg")`,
    },
    secondary: {
        borderRadius: '20px 20px 0px 0px',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.secondary.gray,
    },
    third: {
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: theme.palette.secondary.gray,
    },
    stepper: {
        backgroundColor: theme.palette.secondary.gray,
        borderRadius: '20px 20px 0px 0px',
        padding: '10px 8px',
        '& .MuiStepIcon-root.MuiSvgIcon-root': {
            height: '0.7em',
            width: '0.7em',
        },
        '& .MuiStepIcon-root.MuiStepIcon-completed': {
            color: theme.palette.primary.dark,
        },
        '& .MuiStepIcon-root.MuiStepIcon-active': {
            color: theme.palette.secondary.gray,
        },
    },
    steps: {
        flexDirection: 'column',
        fontFamily: 'SF Pro Display Regular',
        '&.MuiStepLabel-iconContainer, &.MuiStepIcon-text': {
            display: 'none',
            color: 'currentColor',
            fontSize: '0',
        },
        '& .MuiStepLabel-label.MuiStepLabel-active, & .MuiStepLabel-label.MuiStepLabel-completed': {
            fontSize: '0.675rem',
            fontWeight: 700,
        },
    },
    itemCart: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
    },
    itemCartTxt: {
        fontSize: '14px',
    },
    AddItemTxt: {
        fontSize: '12px',
        textTransform: 'uppercase',
    },
    orderList: {
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '10px 0',
        },
        '& .MuiIconButton-root': {
            padding: 10,
        },
    },
    processingTxt: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontFamily: 'SF Pro Display Regular',
    },
    detailList: {
        display: 'flex',
        flexDirection: 'column',
    },
    detailListItem: {
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        lineHeight: '1',
        '&:first-child': {
            paddingTop: 0,
        },
    },
    productName: {
        fontWeight: 'bold',
        fontSize: '14px',
        textTransform: 'capitalize',
    },
    order: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
        padding: '13px 16px',
    },
    buttons: {
        border: `1px solid ${theme.palette.secondary.dark}`,
        borderRadius: '10px',
        '& .MuiButton-root': {
            minWidth: '45px',
        },
    },
    divider: {
        border: `1px solid ${theme.palette.secondary.gray}`,
        width: '99%',
        height: '0px',
    },
    bottomContainer: {
        backgroundColor: theme.palette.secondary.main,
        padding: '16px',
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
    },
    bottomContainerTitle: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 8,
    },
    inputField: {
        border: '1px solid ',
        borderRadius: '10px',
        height: 30,
        margin: '6px 0',
        '&:focus': {
            outline: 'none',
        },
        '&:hover': {
            outline: 'none',
        },
        '& .MuiInputBase-input': {
            padding: '0 14px',
            height: 30,
        },
        '& .MuiOutlinedInput-root': {
            height: 30,
            '&:focus': {
                outline: 'none',
            },
            '&:hover': {
                outline: 'none',
            },
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderRadius: 10,
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline:focus': {
            outline: 'none',
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline:hover': {
            outline: 'none',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
    },
    errorText: {
        color: theme.palette.primary.main,
        fontSize: 13,
    },
    btnGreen: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        borderRadius: '5px',
        padding: '3px 14px',
        margin: '6px 0',
        '&:hover, &:focus': {
            outline: 'none',
            backgroundColor: theme.palette.primary.dark,
        },
    },
    btnGrid: {
        width: '100%',
        textAlign: 'center',
        padding: '16px',
        backgroundColor: theme.palette.secondary.gray,
    },
    btnRed: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        width: '100%',
        borderRadius: '5px',
        '&:hover, &:focus': {
            outline: 'none',
            backgroundColor: theme.palette.primary.main,
        },
    },

    second: {
        backgroundColor: theme.palette.secondary.dark,
    },
    select: {
        width: '75%',
        border: `1px solid ${theme.palette.secondary.gray}`,
        borderRadius: '10px',
        '&.MuiInput-underline:after': {
            borderBottom: 'none',
        },
    },
}));

export default useStyles;