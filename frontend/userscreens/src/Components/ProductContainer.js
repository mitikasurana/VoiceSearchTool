import React from 'react';
import ProductCard from './ProductCard';
import Grow from '@material-ui/core/Grow';

const ProductContainer = (props) => {
    console.log(props.items);
    const body =props.items.map(item => {
            return (<Grow>
                <ProductCard title = {item.title} image = {item.images} body={item.body}/>    
            </Grow>)
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