const {
	Client
} = require('discord.js');
const tokens = "BOT TOKEN HERE";

const client = new Client();
const prefix = ".";
const adminID = "343694615888658443";
client.on('ready', () => {
	console.log('running.');
	client.user.setGame('running.');
});

client.on('message', message => {
	const commands = {
		'help': (message) => {
			let tosend = ['```xl', 'JavaScript version: "1.0.0"', 'Swift Version: "0.0.1"', '\ncommands anyone can use:'.toUpperCase(), prefix + 'nick your nickname : "Changes your nickname on this server"', prefix + 'role your role : "Assigns the mentioned role"', prefix + "8ball your question? : \"Answers your weirdest questions\"", prefix + 'avatar : "Sends a direct link to your avatar"', "\n", 'commands for admins/mods only:'.toUpperCase(), prefix + 'kick @member : "kicks the mentioned user"', prefix + 'ban @member : "bans the mentioned user"', prefix + 'purge ### : "Deletes up to 100 messages."', '```'];
			message.channel.sendMessage(tosend.join('\n'));
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
				message.channel.sendMessage(`${amountToDelete - 1} messages have been deleted.`).then(response => response.delete(3000));
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

		}

	}
	if (!message.content.startsWith(prefix)) return;
	if (commands.hasOwnProperty(message.content.toLowerCase().slice(prefix.length).split(' ')[0])) commands[message.content.toLowerCase().slice(prefix.length).split(' ')[0]](message);
});
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'general');
	const rulesChannel = member.guild.channels.find('name', 'rules');
	const newComer = member.guild.roles.find('name', 'Newcomer');
	if (!channel) return;
	channel.send(`Welcome to the server, ${member}. Don't forget to check the ${rulesChannel}!`);
	member.addRole(newComer);

});
client.login(tokens);