const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "confessionreply",
  id: "btn-confessionreply",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("discord.js").Message} message
   */
  execute: async (client, interaction, message) => {

    const txtModal = new ModalBuilder({
        customId: `confessionreply-${interaction.user.id}`,
        title: `Reply Confession`,
    })

    const confessionInputReply = new TextInputBuilder({
        customId: 'confessionInputReply',
        label: 'Reply the confession',
        style: TextInputStyle.Paragraph,
        required: true,
        maxLength: 666,
        placeholder: '(!) Just do not harass anyone',
    })

    const firstRow = new ActionRowBuilder().addComponents(confessionInputReply)

    txtModal.addComponents(firstRow)
        
    await interaction.showModal(txtModal);

    // Wait for modal to be submitted
    const filter = (interaction) => interaction.customId === `confessionreply-${interaction.user.id}`;

    interaction
        .awaitModalSubmit({ filter, time: 300_000 })
        .then((modalInteraction) => {
            const confessionValue = modalInteraction.fields.getTextInputValue('confessionInputReply');
            const confessionTxt = new EmbedBuilder()
                .setAuthor({ name: "replied confession", iconURL: "https://i.imgur.com/Y1LVb8G.png", url: "https://discord.com/channels/447069790150852609/1162410164356390912" })
                .setDescription(`${confessionValue}`)
                .setColor('2b2d31')
                .setTimestamp()
                .setFooter({ text: 'from Anonymous' })
            const btnConfess = new ActionRowBuilder()
              .addComponents(
                  new ButtonBuilder()
                  .setLabel("Reply")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji("<:reply:1163568309816541256>")
                  .setCustomId("btn-confessionreply")
              )
              .addComponents(
                  new ButtonBuilder()
                  .setLabel("Confession")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji("<:write:1163568311716565154>")
                  .setCustomId("btn-confession")
              )
            const confessionLog = new EmbedBuilder()
                .setDescription(`<@${interaction.member.id}> just replied confession`)
                .setColor('2b2d31')
                .setTimestamp()
                .setFooter({ text: `(r) ${interaction.user.username}` })
            modalInteraction.guild.channels.cache.get('1162419484305391800').send({ embeds: [confessionLog] })
            modalInteraction.reply({ embeds: [confessionTxt], components: [btnConfess] })
        })
        .catch((e)=> { console.log(e) })
  },
};