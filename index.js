var Bottr = require('bottr')
var Request = require('request')

var bot = new Bottr.Bot()

bot.on('message_received', function(message, session) {

  console.log('Fetching meme for "' + message.text + '"')

  Request.post('https://api.memetrash.co.uk/cat', {
    form:{
      text: message.text
    }
  }, function(err, httpResponse, body) {

    if (body) {

      var response = JSON.parse(body);
      var images = response.data.images
      var image = images[0]

      session.send(null, {
        type: 'image/jpeg',
        url: image
      })

    } else {

      session.send('Wow Such Problems. Many Errors.')
    }
  })
})

bot.listen()
