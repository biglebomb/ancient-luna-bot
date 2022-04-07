const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user')

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user')

    message.guild.channels.cache.get('952164768217706496').send(`<@${target.user.id}> joining us as alliance from ${role}. Hope we can through this long journey together around Toram world`).then(target.roles.add(role));
    
    await message.delete();

    const addDF = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED" }, { name: "https://i.imgur.com/ejkkWCB.png" })
        .setDescription(`You have been gived **Alliances** role and have access to several channels in **[Departure from Iruna](https://discord.gg/hgjY95ZDQg)** category. Hope we can through this long journey together around Toram world`)
        .setTimestamp()
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })
    await target.user.send({ embeds: [addDF] })
}

module.exports.help = {
    name: 'ally'
}