const forecast = require('./forecast')
const geocode = require('./geocode')

//const address = process.argv[2]
const address='goa'

if(!address){
    console.log('Please provide an address!')
} else{
    //geocode(address , (error,data) => {
    geocode(address , (error,{ latitude , longitude, location} = {} ) => {
        if(error){
            return console.log(error)
        }
        //forecast(data.latitude , data.longitude ,(error1,forecastData)=>{
        forecast(latitude , longitude , (error1,forecastData)=>{
            if(error1){
                return console.log(error)
            }
    
            console.log(location)
            console.log(forecastData)
    
        })
    })
    
}

