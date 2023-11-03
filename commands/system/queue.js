const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Order an item')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('User who wants to order')
				.setRequired(true))
        .addStringOption(option =>
			option
				.setName('order')
				.setDescription('Nitro Basic, Nitro')
				.setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('quantity')
                .setDescription('How many? ')
                .setMinValue(1)
                .setMaxValue(3)
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('price')
                .setDescription('₱120, ₱200')
                .setMinValue(120)
                .setMaxValue(200)
                .setRequired(true))
        .addStringOption(option =>
            option
            .setName('mop')
            .setDescription('Gcash, PayPal')
            .setRequired(true)),
            
        async execute(interaction) {
            
            const target = interaction.options.getUser('user');
            const order = interaction.options.getString('order') ?? 'No order provided';
            const quantity = interaction.options.getInteger('quantity') ?? 'No quantity provided';
            const price = interaction.options.getInteger('price') ?? 'No price provided';
            const mop = interaction.options.getString('mop') ?? 'No mop provided';
            const toTitleCase = (phrase1, phrase2) => {
                const capitalizeWords = (phrase) => {
                  return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                };
              
                const result1 = capitalizeWords(phrase1);
                const result2 = capitalizeWords(phrase2);
              
                return [result1, result2];
              };
              
              const [result1, result2] = toTitleCase(order, mop);
            
            await interaction.reply(`📩 ${target.toString()}\n\n•  ${result1}\n•  ${quantity}\n•  ₱${price}\n•  ${result2}\n`);
        },
};