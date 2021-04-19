import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    categoryCardContainer: {
        backgroundColor: theme.palette.secondary.gray,
        display: 'flex',
        justifyContent: 'center',
        height:'auto',
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
        category_row_bg: {
            
            height: '100px',
            width: '55%',
            top: '-30%',
            left: '27%',
           
        },
        category_image: {

            marginLeft: '35%',
        },
        category_title:{
            fontSize:'15px',
            marginLeft:'60px',
            textOverflow:'ellipsis',
            flexWrap:'nowrap',
            width:'160px',
        },

    },
    '@media (min-width:426px) and (max-width:768px)':{

        category_title:{
            fontSize:'15px !important',
            // marginLeft:'60px',
            margin:'0 auto !important',
            textOverflow:'ellipsis',
            flexWrap:'nowrap',
            width:'70%',
        },
        category_image: {

            marginLeft: '85px !important',
        },
        category_row_bg:{
            left:'25px !important',
            height:'100px !important',
            width:'80% !important',
            top:'-83px !important',
        },
        category_column:{
            marginBottom:'-35px !important',
        },
    },

    '@media (min-width:320px) and (max-width:425px)':{
            category_column:{
                marginBottom:'-70px !important',
            },
            category_image:{
                marginLeft:'33% !important',
                height:'90px !important',
            },
            category_row_bg:{
                top:'-85px !important',
                left:'42px !important',
                height:'90px !important',
                width:'60% !important',

            },
            category_title:{
                fontSize:'14px !important',
            marginLeft:'31% !important',
            textOverflow:'ellipsis',
            flexWrap:'nowrap',
            width:'90px !important',
            },
        
    },
    category_image: {

        width: '40%',
        height: '146px',
        marginLeft: '30%',
    },
    category_row_bg: {
        backgroundColor: '#f4f4f4',
        border: 0,
        borderRadius: '10px',
        height: '120px',
        width: '55%',
        position: 'relative',
        top: '-105px',
        left: '96px',
        zIndex: -1,
        transform:'skewX(10deg)',
    },
    category_title: {
        fontSize: '19px',
        fontWeight: 700,
        margin:'0 auto',
    },
    category_column: {
        paddingBottom: '0px',
        marginBottom: '30px',
    },
    category_row: {
        paddingBottom: '0px',
        marginTop:'30px',
    },

    

}))

export default styles;