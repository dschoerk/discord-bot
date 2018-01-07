const Discord = require('discord.js');
const request = require('request');
const config = require('./config');


console.log(config);

var bot = new Discord.Client();
bot.login(config.bot_token);

bot.on('ready', () => {
        console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on("disconnect", () => {
        console.log("Bot disconnected");
        bot.login(config.bot_token); //Auto reconnect
});

bot.on('message', chatmsg => {

	if(chatmsg.content === '!panda' || chatmsg.content === 't!panda') {
		const url = `https://api.giphy.com/v1/gifs/random?api_key=${config.giphy_token}&tag=red%20panda`;
		request(url, (error, response, body) => {

			const msg = JSON.parse(body);
			chatmsg.channel.send(msg.data.image_url, (error, response) => {
	       			console.log("bot error: " + error);
			        console.log("bot response: " + response);
		        });
		});
	}
});
