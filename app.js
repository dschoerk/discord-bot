const Discord = require('discord.io');
const request = require('request');
const config = require('./config');


console.log(config);

var bot = new Discord.Client( {
    autorun : true,
    token : config.bot_token
});

bot.on('ready', () => {
        console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on("disconnected", () => {
        console.log("Bot disconnected");
        bot.connect(); //Auto reconnect
});

bot.on('message', (user, userID, channelID, message, rawEvent) => {

	if(message === '!panda' || message === 't!panda') {
		const url = `https://api.giphy.com/v1/gifs/random?api_key=${config.giphy_token}&tag=red%20panda`;
		request(url, (error, response, body) => {

			const msg = JSON.parse(body);
			bot.sendMessage({to: channelID, message: msg.data.image_url}, (error, response) => {
	       			console.log("bot error: " + error);
			        console.log("bot response: " + response);
		        });
		});
	}
});
