var Bottr = require('bottr')
var Request = require('request')

var bot = new Bottr.Bot()

bot.on('message_received', function(message, session) {

  Request.post('https://api.memetrash.co.uk/', {
    form:{
      text: message.text
    }
  }, function(err, httpResponse, body) {

    var response = JSON.parse(body);
    session.send(null, {
      type: 'image/jpeg',
      url: response.url
    })
  })
})

bot.listen()
