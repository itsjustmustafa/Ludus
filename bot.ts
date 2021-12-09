const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
console.log(Intents.FLAGS);
client.once('ready', () => {
	console.log("Ludus Bot! 🤖🕹️");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	console.log(interaction);

	if (commandName === 'countdown') {
		await interaction.reply("Timer Start");
		addTimer(interaction);
	}
	// ...
});

// client.on("messageCreate", (message) => {
// 	if (message.author.bot) return false; 
	
// 	console.log(message);
// 	console.log("🤖⭐🌈💕🎲🎮");
// });

function Timer(interaction){
	this.channelID = interaction.channelId;
	
	this.flagTimes = [20, 10, 5, 0];
	this.flagged = [0,0,0,0];
	this.flagMsgs = [
		"20 seconds remaining ⏲️",
		"10 seconds left! ⚡",
		"5 more seconds! 😓",
		"Done."
	];

	this.startTime = Date.now();
	this.endTime = Date.now() + 30*1000;

	this.currentCounter = function(){
		return Math.max(this.endTime - Date.now(), 0)/1000;
	}

	this.currentMsg = function(){
		return "Time Left:" + Math.floor(this.currentCounter()).toString();
	}
	
	this.sendMsg = client.channels.cache.get(this.channelID).send;

	this.checkAndNotify = function(client){
		let timeLeft = this.currentCounter();
		console.log(timeLeft);
		for(let i = 0; i < this.flagged.length; i++){
			if((timeLeft <= this.flagTimes[i]) && (this.flagged[i] == 0)){
				// this.sendMsg(this.flagMsgs[i]);
				client.channels.cache.get(this.channelID).send(this.flagMsgs[i]);
				//console.log(this.flagMsgs[i]);
				this.flagged[i] = 1;
				//console.log(this.flagged);
			}
		}

		if(timeLeft <= 0){
			return true;
		}else{
			return false;
		}
		//client.channels.cache.get(this.channelID).send("End Of Timer!");

	}
}


let timers = [];

function addTimer(interaction){
	timers.push(new Timer(interaction));
}


function manageTimers(client){
	for(let i = timers.length-1; i >= 0 ; i--){
		//console.log(timers[i].currentMsg());
		if(timers[i].checkAndNotify(client)){
			timers.splice(i, 1);
		}
	}
}

setInterval(manageTimers.bind(this, client),  1000);

client.login(token);
