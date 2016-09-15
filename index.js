var Bottr = require('bottr')

var bot = new Bottr.Bot()

bot.on('message_received', function(message, session) {

  // - Make API Request
  // - Send back an Image

  session.send('Wow')
})

bot.listen()
