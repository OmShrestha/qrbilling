import React from 'react';
import { Card, CardContent, Grid, Paper, Typography } from '@material-ui/core'
import styles from './categoryCard.style'
import DummyLogo from '../../assets/1.jpg'

function CategoryCard({ category }) {
    const classes = styles();
    return (
        <Grid
            container
            className={classes.categoryCardContainer}
        >
            {category?.map((data, index) => (
                <Grid item xs={6} key={index}>
                    <Card elevation={0} className={classes.categoryCard}>
                        {/* <CardContent> */}

                        <img
                            src={DummyLogo}
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
                        {/* </CardContent> */}
                    </Card>
                </Grid>
            ))
            }
        </Grid>
    )
}

export default CategoryCard
