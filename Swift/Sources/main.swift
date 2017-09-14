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
  if message.content.hasPrefix(prefix + "uwu"){
    message.reply(with: "uwu")
  }



  
}

bot.connect()