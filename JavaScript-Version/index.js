const {
	Client
} = require('discord.js');
const tokens = "BOT TOKEN HERE";

const client = new Client();
const prefix = ".";
const adminID = "353655562447355905";
const fs = require("fs");
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
client.on('ready', () => {
	console.log('Ready!');
	client.user.setGame('nyanpasuowo.github.io');
	
});

client.on('message', message => {
	const commands = {
		'help': (message) => {
			
			message.channel.send({embed: {
				color: 3447003,
				author: {
				  name: client.user.username,
				  icon_url: client.user.avatarURL
				},
				title: "Shinobu's command list",
				description: "Current version: __**0.6.3**__\nCommands that require an argument are highlighted like this: **argument**",
				fields: [{
					name: "Moderation :hammer_pick:",
					value: ".kick **@member** : kicks the mentioned user.\n.ban **@member** : bans the mentioned user\n.purge **###** : Deletes up to 100 messages."
				  },
				  {
					name: "Commands anyone can use",
					value: ".quote : Prints out a random quote\n.nick **your nickname**: Changes your nickname on this server.\n.role **your role**: Assigns the role you want(as long as It doesn't require special permissions.)\n.8ball **your question **: Answers your weirdest questions.\n.avatar: Sends a direct link to your avatar."
				  },
				  {
					name: "Levels",
					value: ".level **current** : Check your current level\n.level **reset** : Resets your level"
				  },
				  {
					name: "Support",
					value: "Add NyanpasuOWO#2834 if you need help."
				  }
				],
				timestamp: new Date(),
				footer: {
				  icon_url: client.user.avatarURL,
				  text: client.user.username
				}
			  }
			});
			
		},
		'reboot': (message) => {
			if (message.author.id == adminID) {
				process.exit();

			} else {
				message.reply("You are not my creator, you cannot restart me. ask `Nyanpasuowo#2834` if it is really needed.");
			}
		},
		'avatar': (message) => {
			message.reply(message.author.avatarURL)
		},
		'purge': (message) => {
			var args = message.content.split(/[ ]+/);
			var amountToDelete = args[1];
			if (amountToDelete < 2) {
				message.reply('Use this command only if you need to delete more than 2 messages, otherwise do it yourself, lazy ass cunt.');
			} else {
				message.channel.fetchMessages({
					limit: amountToDelete++
				}).then(messages => message.channel.bulkDelete(messages));
				console.log(amountToDelete);
				message.channel.sendMessage(`${amountToDelete - 1} messages have been deleted. :wastebasket:`).then(response => response.delete(3000));
			}
		},
		'role': (message) => {

			var args = message.content.split(' ');
			if (args.length > 1) {
				args.splice(0, 1);
				var role = args;
				var roleString = role.join(' ');
				var roleToAssign = message.guild.roles.find("name", roleString);
				message.member.addRole(roleToAssign);
				message.reply(`I hope you like your new role: ${roleToAssign}`);
			} else {
				message.reply('You need to specify a role.');
			}
		},
		'8ball': (message) => {
			var question_array = message.content.split(' ');
			if (question_array.length > 1) {
				question_array.splice(0, 1);
				var question = question_array;
				var question_string = question.join(' ');
				var answers = [
					'vro 😳', 'No.', 'Maybe.', 'Yes.', 'Hmmmmmmmm.', 'Let me think......Nope.', 'Probably.',
					'Def sure about that.',
					'Only  you can decide.', 'I love you.', 'That is a great idea.', 'I am not sure about that.',
					'Hell yeah.'
				];
				var bot_answer = answers[Math.floor(Math.random() * answers.length)];
				message.reply("Your question was: " + "`" + question_string + "`" + '\n' + 'My answer is: ' + "`" + `${bot_answer}` + "`");
			} else {
				message.reply("You need to ask me a question.");
			}

		},
		'ban': (message) => {
			var personToBan = message.mentions.members.first();
			if (message.member.hasPermission("BAN_MEMBERS")) {
				personToBan.ban();
				message.reply(`${personToBan} has been banned.`);
			} else {
				message.reply('You cannot do that.');
			}
		},
		'kick': (message) => {
			var personToKick = message.mentions.members.first();
			if (message.member.hasPermission("KICK_MEMBERS")) {
				personToKick.kick();
				message.reply(`${personToKick} has been kicked.`);
			} else {
				message.reply('You cannot do that.');
			}
		},
		'nick': (message) => {
			if (message.member.hasPermission("READ_MESSAGES")) {
				var msg = message.content.split(' ');
				msg.splice(0, 1);
				var nick = msg.join(' ');
				//var authorAt = message.mentions.members.first();

				message.member.setNickname(nick).then(user => message.reply(`I hope you like your new nickname: ${nick}`));

			} else {
				message.reply("XD");
			}


		},
		'status':(message) =>{
			if(message.author.id == adminID){
				var msg = message.content.split(' ');
				msg.splice(0, 1);
				var status = msg.join(' ');
				client.user.setGame(status);
				message.reply("done.");
			}
			else{
				message.reply("you can't do that.");
			}
		},
		'quote':(message) =>{
			var quotes = ['It\'s not good to expect too much, but you can\'t do anything if you\'re being overly pessimistic. If you just wait thinking it\'s useless, nothing will come of it.', 'No matter what bonds you forge with others, time will tear them apart. Well... Doesn\'t thinking about it make you sick?', 'It\'s difficult to change the world on your own, but twisting it a little might not be all that hard.', 'There\'s no reason a fake can\'t do what the real thing would. And it\'s possible for a fake to be more real than the real thing.', 'The sun is my enemy, but the moon has been good to me.'];
			var randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];
			message.channel.send(randomQuotes);
		}
		

	}
	if (!points[message.author.id]) points[message.author.id] = {
		points: 0,
		level: 0
	  };
	  let userData = points[message.author.id];
	  userData.points++;
	
	  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
	  
	 switch (userData.points) {
		 case 10:
			 message.reply("You are now level 1!");
			 userData.level = 1;
			 break;
		case 20:
			message.reply("You are now level 2!");
			userData.level = 2;	
			break;
		case 30:
			message.reply("You are now level 3!");
			userData.level = 3;
			break;
		case 40:
			message.reply("You are now level 4!");
			userData.level = 4;
			break;
		case 50:
			message.reply("You are now level 5!");
			userData.level = 5;
			break;
		case 60:
			message.reply("You are now level 6!");
			userData.level = 6;
			break;
		case 70:
			message.reply("You are now level 7!");
			userData.level = 7;
			break;
		case 80:
			message.reply("You are now level 8!");
			userData.level = 8;
			break;
		case 90:
			message.reply("You are now level 9!");
			userData.level = 9;
			break;
		case 100:
			message.reply("You are now level 10! You have reached the maximum level. :party:");
			userData.level = 10;
			break;
		 default:
			 break;
	 } 
	  /*if(userData.points == 10 || userData.points == 20){
		  userData.level = 1;
		  message.reply("You have leveled up to **level 1**. ");
	  }*/
	
	  if (message.content.startsWith(prefix + "level")) {
		  var args = message.content.split(' ');
		  if(args[1] == 'current'){
		message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
	}
		if(args[1] == 'reset'){
			userData.points = 0;
			userData.level = 0;
			message.reply("Successfully reinitiliazed your level and points");

		}
	  }
	  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
		if (err) console.error(err)
	  });
	
	if (!message.content.startsWith(prefix)) return;
	if (commands.hasOwnProperty(message.content.toLowerCase().slice(prefix.length).split(' ')[0])) commands[message.content.toLowerCase().slice(prefix.length).split(' ')[0]](message);
});
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'general');
	const rulesChannel = member.guild.channels.find('name', 'rules');
	//const newComer = member.guild.roles.find('name', 'Newcomer');
	if (!channel) return;
	channel.send(`Welcome to the server, ${member}. Don't forget to check the rules!`);
	//member.addRole(newComer);

});
client.login(tokens);