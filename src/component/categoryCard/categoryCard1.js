import React from 'react';
import {Card, Grid, Typography} from '@material-ui/core';
import styles from './categoryCard.style';
import DummyLogo from '../../assets/1.jpg';

function CategoryCard({ category, click}) {
    const classes = styles();
    return(
        <Grid container className={classes.category_row}>



                <Grid item md={4} className={classes.category_column}>
                    <img src={Tea} alt="cat-img" className={classes.category_image} />
                    <Typography className={classes.category_title} align="center">Tea & Coffee</Typography>
                    <Paper className={classes.category_row_bg}></Paper>
                </Grid>
        
        </Grid>
    )
}