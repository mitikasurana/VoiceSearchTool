const request = require ('postman-request')

const geocode = (address , callback) => {
    //we could also use simply address in place of encodeURIComponent(address) but it converts address to string so if address contains any special character then too the program doesn't crash.
    //whatever address we pass we will add that in url and thus can obtain it's corresponding coordinates
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlkaGltb3R3YW5pIiwiYSI6ImNrZmplZTBseTAwYnUyeW8yNmZ0MXYxZWgifQ.ZQJ0wHIXOTSq4HBU1VA5Pw&limit=1'

    //request({url:url , json:true } , (error,response)=> {
    request({url , json:true } , (error, {body} )=> {
        if(error){
            callback('Unable to connect to location services!',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log(body.features[0].place_name)
            callback(undefined, {
                latitude: body.features[0].center[1] ,
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode