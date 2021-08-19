const fs = require('fs');

module.exports = {
	name: 'reload',
	aliases: ['rl', 'load'],
	description: 'Reloads a command.',
	developer: true,
	args: true,
	execute(message, { args }) {
		const { client } = message;
		const commandName = args[0].toLowerCase();
		const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {return message.channel.send({ content: 'That isn\'t a valid command!' });}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			client.commands.set(newCommand.name, newCommand);
			message.channel.send({ content: `Command \`${newCommand.name}\` was reloaded!` });
		} catch (err) {
			console.error(`An error occured reloading ${command.name}:\n`, err);
			message.channel.send({ content: `An error occured while reloading \`${command.name}\`:\n${err.message}` });
		}
	},
};