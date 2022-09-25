const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
  if (args.length === 0) return message.channel.send("Do: !whisper `userid` `message`").catch((e) => {});

  const user =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]).user;
  
  const str = args.slice(1).join(" ");
  
  const embed = new MessageEmbed()
      .setDescription(`**Email**: daeva@ancientluna.org\n**Discord**: Dae#0090\n**Instagram**: ~~[imsoondae_](https://instagram.com/imsoondae_)~~`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor('7289da')

  const btnServer = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setStyle("LINK")
      .setLabel("See announcement")
      .setURL(`https://discord.com/channels/447069790150852609/839200933291622450`)
    )

  user.send({
    content: `${str}\n⁣`,
    embeds: [embed],
    components: [btnServer]
  }).catch((e) => {});
}

module.exports.help = {
  name: 'whisper'
}