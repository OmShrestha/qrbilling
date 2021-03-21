import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import styles from './categoryCard.style';
import DummyLogo from '../../assets/1.jpg';

function CategoryCard({ category, click }) {
    const classes = styles();
    return (
        <Grid
            container
            className={classes.categoryCardContainer}
        >
            {category?.map((data, index) => (
                <Grid item key={index} >
                    <Card onClick={() => click(data.id, index + 1, data.child)} elevation={0} className={classes.categoryCard}>
                        <img
                            src={data.image || DummyLogo}
                            alt={data.id}
                            className={classes.categoryImage}
                        />
                        <div className={classes.imageOverlay} />
                        <Typography
                            variant="subtitle1"
                            className={classes.categoryName}
                        >
                            {data.name}
                        </Typography>
                    </Card>
                </Grid>
            ))
            }
        </Grid>
    )
}

export default CategoryCard
