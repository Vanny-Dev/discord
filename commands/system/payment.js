const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('payment')
		.setDescription('setup your payment'),
    async execute(interaction) {
        
        const gcash = new ButtonBuilder()
            .setCustomId('gcash')
            .setLabel('Gcash')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('☑')

        const paymaya = new ButtonBuilder()
            .setCustomId('paymaya')
            .setLabel('Paymaya')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('☑')

        const paypal = new ButtonBuilder()
        .setCustomId('paypal')
        .setLabel('PayPal')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('☑')


        const row = new ActionRowBuilder()
            .addComponents(gcash, paymaya, paypal);

            const embed = new EmbedBuilder()
            .setDescription('📄  Always send your receipt\n\n❌  No refund/cancellation once order is made.\n\n⚠NO PROOF NO PROCESS!')
            .setColor(0x18e1ee)

            const response = await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true,
            });

            const filter = (i) => i.user.id === interaction.user.id;

            const collector = response.createMessageComponentCollector({
                componentType: ComponentType.Button,
                filter,
                time: 5000,
            });

            const embed1 = new EmbedBuilder()
            .setTitle(`GCash QR Code`)
            .setDescription('Please proceed for payment transaction.')
            .setColor(0x18e1ee)
            .setImage('https://vanny-dev.github.io/qr/qr.jpg')
            .setThumbnail('https://vanny-dev.github.io/qr/qr.jpg')
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: 'https://vanny-dev.github.io/qr/qr.jpg',
                text: 'GCash'
            })
            .addFields([
                {
                    name: 'GCash Payment',
                    value: 'Please scan this QR Code.',
                    inline: true
                }
            ])

            const embed2 = new EmbedBuilder()
            .setTitle(`Paymaya QR Code`)
            .setDescription('Please proceed for payment transaction.')
            .setColor(0x18e1ee)
            .setImage('https://vanny-dev.github.io/qr/qr.jpg')
            .setThumbnail('https://vanny-dev.github.io/qr/qr.jpg')
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: 'https://vanny-dev.github.io/qr/qr.jpg',
                text: 'Paymaya'
            })
            .addFields([
                {
                    name: 'Paymaya Payment',
                    value: 'Please scan this QR Code.',
                    inline: true
                }
            ])

            const embed3 = new EmbedBuilder()
            .setTitle(`PayPal QR Code`)
            .setDescription('Please proceed for payment transaction.')
            .setColor(0x18e1ee)
            .setImage(`https://vanny-dev.github.io/qr/qr.jpg`)
            .setThumbnail(`https://vanny-dev.github.io/qr/qr.jpg`)
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: `https://vanny-dev.github.io/qr/qr.jpg`,
                text: 'PayPal'
            })
            .addFields([
                {
                    name: 'PayPal Payment',
                    value: 'Please scan this QR Code.',
                    inline: true
                }
            ])

            collector.on('collect', (interaction) => {
                if (interaction.customId === 'gcash') {
                    interaction.reply({ 
                        
                        embeds: [embed1], ephemeral: true, 
                        
                    })
                }
                else if (interaction.customId === 'paymaya') {
                    interaction.reply({ 
                        
                        embeds: [embed2] , ephemeral: true,
                        
                    })
                }
                else if (interaction.customId === 'paypal') {
                    interaction.reply({ 
                        
                        embeds: [embed3], ephemeral: true,

                    })
                }
                
            })

            collector.on('end', () => {
                gcash.setDisabled(true);
                paymaya.setDisabled(true);
                paypal.setDisabled(true);

                response.edit({
                    components: [row]
                })
                
            })
    },
};