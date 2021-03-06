var Bottr = require('bottr')
var BottrApp = require('bottr-app')
var Request = require('request')

var bot = new Bottr.Bot()
var maxTextLength = 64

bot.use(new BottrApp())
bot.on('message_received', function(message, session) {

  var text = message.text.replace(/[^\w\s]/gi, '')
  text = text.substring(0, Math.min(text.length, maxTextLength))

  console.log('Fetching meme for "' + text + '"')

  Request.post('https://api.memetrash.co.uk/cat', {
    form:{
      text: text
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
