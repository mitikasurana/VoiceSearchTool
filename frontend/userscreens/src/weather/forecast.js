const request = require('postman-request')

const forecast = (latitude , longitude , callback ) => {

  const options = {
    method: 'GET',
    url: 'https://visual-crossing-weather.p.rapidapi.com/history',
    qs: {
      startDateTime: '2020-04-08T00:00:00',
      aggregateHours: '24',
      location: 'goa,india',
      endDateTime: '2020-04-08T00:00:00',
      unitGroup: 'us',
      dayStartTime: '8:00:00',
      contentType: 'json',
      dayEndTime: '17:00:00',
      shortColumnNames: '0'
    },
    headers: {
      'x-rapidapi-key': '6bbb550beamsh6a168b46b4ee66dp1a3c6ejsn4f67f366e82a',
      'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
      useQueryString: true
    }
  };

    //request({url:url , json:true} , (error,response) => {
    request(options  , (error,response, body) => {
        if(error){
            console.log ('Unable to connect to weather services!')
        } else if(body.error){
          console.log('Unable to find location. Try another search.')
        } else{
          const temp = JSON.parse(body).locations[options.qs.location].values[0].temp
	        console.log(temp)
          console.log(JSON.parse(body).locations[options.qs.location].values[0].conditions)
          if(temp<=60){
            console.log('Winter')
          } else if(temp<76 && temp>60){
            console.log('Fall')
          } else if(temp>=76 && temp>87){
            console.log('Spring')
          } else{
            console.log('Summer')
          }
        }
    })
}    

module.exports = forecast