import Sword
import Foundation

let bot = Sword(token: "BOT TOKEN HERE")

bot.on(.ready) { [unowned bot] _ in
  bot.editStatus(to: "dnd", playing: "with Araragi!")
  print("I am ready!")
}

bot.on(.messageCreate) { data in
  let message = data as! Message
  let prefix = "//"
  /*if message.content.hasPrefix(prefix + "pin"){
    var fullCommand : [String] = message.content.components(separatedBy: " ")
    fullCommand.remove(at: 0)
    print(fullCommand)
    var messageString = fullCommand.joined(separator: " ")
    print(messageString)
    //bot.pin(message.content)
    message.reply(with: "`The message has been pinned.`")

  }*/
  if message.content.hasPrefix(prefix + "help"){
    let tosend = ['```xl', 'JavaScript version: "1.0.0"','Swift Version: "0.0.1"', '\ncommands anyone can use:'.toUpperCase(), prefix + 'role your role : "Assigns the mentioned role"', prefix + "8ball your question? : \"Answers your weirdest questions\"", prefix + 'avatar : "Sends a direct link to your avatar"', "\n", 'commands for admins/mods only:'.toUpperCase(), prefix + 'kick @member : "kicks the mentioned user"', prefix + 'ban @member : "bans the mentioned user"', prefix + 'purge ### : "Deletes up to 100 messages."', '```'];
    
  }
  if message.content.hasPrefix(prefix + "uwu"){
    message.reply(with: "uwu")
  }



  
}

bot.connect()