const { SlashCommandBuilder, Client, Message } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('nitrodropper')
		.setDescription('Send the order to the buyer')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('User who will receive')
				.setRequired(true)
		)
        .addStringOption(option =>
			option
				.setName('link')
				.setDescription('Nitro Basic, Nitro Boost Link')
				.setRequired(true)
		),

		async execute(interaction) {
			const { channel, client, options } = interaction;

			//const user = options.getMember('user')
			//const message = options.getString('message')

			const user = interaction.options.getUser('user');
            const link = interaction.options.getString('link') ?? 'No order provided';
			
			/*if (user.id === "725998841886933053") {
				console.log(user.id)
				return await interaction.reply({
					content: "hi"
				})
				.catch ((err) => {
					console.error(err)
				})
			}*/

			user.send(`Here's your order, claim it!\n\n${link}`).catch(async (err) => {
				console.log(err)

				return await interaction.editReply({
					content: "Faild to send message, please try again",
				})
				.catch ((err) => {
					console.error(err)
				})
			})
			await interaction.reply({
				content: `You successfully sent the order to ${user.toString()}`, ephemeral: true
			})
			.catch ((err) => {
				console.error(err)
			})
		}
};