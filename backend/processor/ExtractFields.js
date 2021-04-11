/**
 * this method extract the images and title of the resultant products fetched from redis-search-service.
 * this schema is returned to the UI.
 */

 const extract = (results) =>{
    var arr = results.map(item => {
        return {
            title : item.doc.title,
            images : item.doc.images,
            body : item.doc.body,
        }
    });
    return arr;
 }

 module.exports = {extract}