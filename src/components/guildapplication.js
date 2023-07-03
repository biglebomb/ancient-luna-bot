const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildapplication",
  id: "btn-guildapplication",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  execute: async (client, interaction) => {

    const thread = await interaction.channel.threads.create({
        name: `${interaction.member.displayName} Guild Application`,
        autoArchiveDuration: 60,
    }).catch(err => {
        return;
    });

    const threadID = thread.id;
    const ThreadSend = client.channels.cache.get(`${threadID}`);

    const embedForm = new EmbedBuilder()
      .setAuthor({ name: "Ancient Luna Guild Application", iconURL: "https://i.imgur.com/SOCuup9.png" })
      .setDescription(`- Family name in game\n- Name of your previous guild and why you left\n- Country where you stay\n- Any toxicity behaviors in the guild and outside guild are strongly prohibited. Action will be taken if it happens, are you able to comply with the rules?`)
      .setColor("2b2d31")
      .setFooter({ text: "Fill the form and post it here. Hopefully we can be one of the family!" })

    const btnTerms = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("btn-guildterms")
          .setLabel("Read Guild Terms")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("btn-guildmention")
          .setLabel("Mention Now")
          .setStyle(ButtonStyle.Secondary)
      )

    ThreadSend.send({
        embeds: [embedForm],
        components: [btnTerms]
    }).catch(err => {
        return;
    })
    
    return interaction.reply({
        content: `Please go to <#${threadID}> to continue`,
        ephemeral: true,
    });
  },
};
