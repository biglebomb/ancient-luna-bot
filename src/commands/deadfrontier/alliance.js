const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user')

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user')

    message.guild.channels.cache.get('860531645916774401').send(`<@${target.user.id}> joining us as alliance from ${role}. Hope we can through this long journey together around Inner City`).then(target.roles.add(role));
    
    await message.delete();

    const addDF = new MessageEmbed()
        .setAuthor("ROLE ADDED", "https://i.imgur.com/aLkmV4I.png")
        .setDescription(`You have been gived **Alliances** role and have access to **Dead Frontier** category`)
        .setTimestamp()
        .setFooter("#Ancient Luna")
    target.user.send(addDF)
}

module.exports.help = {
    name: 'alliance'
}