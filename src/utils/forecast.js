const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f18dadf32f3869077407f1c39e6e6e70&query="${lat},${long}"&units=f`

    request({url, json: true}, (error, { body }) => {
    //    - Low level error, pass string for error
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.success == false) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.temperature)
        }
    })
}

module.exports = forecast