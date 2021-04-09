const request = require('postman-request')

const forecast = (filter_location ,filter_month, callback ) => {

const month = getMonthFromString(filter_month)

function getMonthFromString(mon){
  var months = [
      "january","february","march","april","may","june","july","august","september","october","november","december"
  ]
  console.log(months.indexOf(mon) + 1)
  return (months.indexOf(mon) + 1)
}

  const options = {
    method: 'GET',
    url: 'https://visual-crossing-weather.p.rapidapi.com/history',
    qs: {
      startDateTime: '2020-'+month+'-15T00:00:00',
      aggregateHours: '24',
      location: filter_location,
      endDateTime: '2020-'+month+'-15T00:00:00',
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

    var temp = null;
    var season = null;
    var conditions = null;
    //request({url:url , json:true} , (error,response) => {
    request(options  , (error,response, body) => {
        if(error){

          console.log('Unable to connect to weather services!')
          return ('Unable to connect to weather services!')

        } else if(body.error){

          console.log('Unable to find location. Try another search.')
          return ('Unable to find location. Try another search.')

        } else{

          temp = JSON.parse(body).locations[options.qs.location].values[0].temp
	        console.log("Temperature:"+temp)
          conditions = JSON.parse(body).locations[options.qs.location].values[0].conditions
          console.log("Conditions:"+conditions)
        

          if(temp<=60){
            season = "Winter"
          } else if(temp<76 && temp>60){
            season = "Fall"
          } else if(temp>=76 && temp>87){
            season = "Spring"
          } else{
            season = "Summer"
          }
          console.log("Season:"+season)
        }
    })

    const result = {
      "temperature" : temp ,
      "condition" : conditions ,
      "season" : season
    }

    return result;
}    

module.exports = forecast