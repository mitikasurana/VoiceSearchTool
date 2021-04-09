import React from 'react';
import ProductCard from './ProductCard';
import Grow from '@material-ui/core/Grow';

const ProductContainer = (props) => {
    console.log(props.items);
    const body =props.items.map(item => {
        return item.images.map(img => (
            <Grow>
                <ProductCard title = {item.title} image = {img} body={item.body}/>    
            </Grow>
        ))
    })
    return(
        <div style={{display:"flex",flexDirection:"row",justifyItems:"center",justifyContent:"space-between",
        flexWrap : "wrap",padding : 100}}>
            {
             body   
            }
        </div>
    )
}

export default ProductContainer;