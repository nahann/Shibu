const fetch = require('node-fetch');

module.exports = {
	name: 'npm',
	aliases: ['searchnpm'],
	description: 'Search for any npm package',
	run: async (client, message, args) =>{
		if (!args.length) return message.reply('specify a npm package dumbass'); 
                const query = args[0]
		const fetchurl = `https://api.npms.io/v2/search?q=${query}`;

		let res;
		try {
			res = await fetch(fetchurl).then((response) => response.json()); 
		} catch (e) {
			return message.reply({embeds: [client.embed({title: "An error occured!",description: `${e}`},message)]});
                        console.error(e)
		}
		try {
			const { package } = res.results[0]
			const embed = client.embed({title:pkg.name,url: pkg.links.npm,description: pkg.description},message)				
                                .setThumbnail(message.author.displayAvatarURL())
				.addField('Author', pkg.author?.name || 'Not Specified', true)
				.addField('Version', pkg.version, true)
				.addField(
					'Repository',
					`[Click here](${
						pkg.links.repository || 'No repository specified'
					})`,
					true
				)
				.addField(
					'Maintainers',
				        pkg.maintainers?.map((e) => `\`${e.username}\``).join(' | ')
						|| 'No maintainers',
					true
				)
				.addField(
					'Keywords',
					pkg.keywords?.join(', ') || 'No keywords specified',
					true
				)
			message.reply({ embeds: [embed]});
		} catch (e) {
                        console.error(e)
			return message.reply(`\`${query}\` is not a valid npm package`);
		}
	},
};
