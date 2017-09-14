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
				description: "Current version: __**0.3.1**__",
				fields: [{
					name: "Moderation :hammer_pick:",
					value: ".kick @member : kicks the mentioned user.\n.ban @member : bans the mentioned user\n.purge ### : Deletes up to 100 messages."
				  },
				  {
					name: "Commands anyone can use",
					value: ".level : check your current level\n.nick your nickname: Changes your nickname on this server.\n.role your role: Assigns the role you want(as long as It doesn't require special permissions.)\n.8ball your question: Answers your weirdest questions.\n.avatar: Sends a direct link to your avatar."
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
				message.reply("You are not my creator, you cannot restart me. ask `キスショット・アセロラオリオン・ハートアンダーブレード#2834` if it is really needed.");
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
		case 50:
			message.reply("You are now level 5!");
			userData.level = 5;
		case 60:
			message.reply("You are now level 6!");
			userData.level = 6;
		case 70:
			message.reply("You are now level 7!");
			userData.level = 7;
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
		message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
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
	channel.send(`Welcome to the server, ${member}. Don't forget to check the ${rulesChannel}!`);
	//member.addRole(newComer);

});
client.login(tokens);