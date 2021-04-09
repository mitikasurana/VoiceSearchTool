/**
 * The below method process the data i.e. products by adding only necesaary fields in reqiured format
 * and returns a list of products
 */

const processData = (data) => {
    const productList = data.map(product => {
        return {
            title: (product.title === undefined ? "" : product.title),
            link : (product.link === undefined ? "" : product.link),
            size: (product.size === undefined ? "" : product.size),
            brand: (product.brand === undefined ? "" : product.brand),
            dominant_material:( product.dominant_material === undefined ? "" : product.dominant_material),
            actual_color: (product.actual_color === undefined ? "" : product.actual_color),
            dominant_color: (product.dominant_color === undefined ? "" : product.dominant_color),
            product_type: (product.product_type === undefined ? "" : product.product_type),
            images: product.images.split('|').toString(),
            body: (product.body === undefined ? "" : product.body),
            product_details: (product.product_details === undefined ? "" : product.product_details),
            complete_the_look: (product.complete_the_look === undefined ? "" : product.complete_the_look),
            type: (product.type === undefined ? "" : product.type),
            ideal_for: (product.ideal_for === undefined ? "" : product.ideal_for),
            specifications : (product.specifications === undefined ? "" : product.specifications),
            inventory : (product.inventory === undefined ? "" : product.inventory)
        }
    })
    return productList;
}

module.exports = { processData };