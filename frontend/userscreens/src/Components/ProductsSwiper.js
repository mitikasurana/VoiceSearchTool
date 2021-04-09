import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ProductCard from './ProductCard';
import {Container, Box, Badge} from '@material-ui/core';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles ={
    slideContainer:{
        
    },
    slide: {
        padding: 15,
    },
    shape: {
        backgroundColor: "black",
        height: 20,
        borderradius : 20
    },
}

const ProductsSwiper = (props) =>{

    const rectangle = <div className={styles.shape} />;
    const body =  props.items.map((item,index) => {
      return item.images.map((img) => (
          <ProductCard title = {item.title} image = {img} body={item.body} style ={styles.slide}/>                                   
        )
      )
    })
    return(
        <Container>
            <Box>
            <Badge color ="blue" badgeContent={props.season} >
                {rectangle}
            </Badge>
            </Box>
            <AutoPlaySwipeableViews style={styles.slideContainer}>
            {body}
            </AutoPlaySwipeableViews>
        </Container> 
    )
}

export default ProductsSwiper;