const { MessageEmbed, ReactionManager } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    
    const channel = '864556584818835456';
    const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Agma')
    const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')

    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';

    let embed = new MessageEmbed()
        .addField('**#** <a:_util_arrow:864810269771300875> **HOW TO SUBMIT A SUGGESTION AND TICKET**\n⁣', '**Type** the command `!suggest` followed by the feedback you want to send\nExample `!suggest` `ancestor need to awake 24/7`\n\n**Type** the command `!applyticket` and a room ticket will open for you\n⁣')
        .addField('**#** <a:_util_arrow:864810269771300875> **ALL CLAIMABLE ROLES IN SERVER**\n⁣', 'The <:game_logo_df:861580085000798229> <@&856379808937410590> role only given to clan members and clan alliances in **Dead Frontier** game. You can apply to get this role by open a ticket for application.\n\n'
            + `${BlackDesertOnlineEmoji} <@&856380073745186876> for **Black Desert Online** `
            + `${ApexLegendsEmoji} <@&861400119101095937> for **Apex Legends**\n\n**React** to any reaction that suits you for the game you love. By this you will unlock the hidden category in this server to meet another fellow seeker in this sanctuary`)

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(BlackDesertOnlineEmoji);
    messageEmbed.react(ApexLegendsEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole);
                const addBDO = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/etMSX3u.png")
                    .setDescription("You have been gived **Agma** role and have access to **Black Desert Online** category")
                    .setTimestamp()
                    .setColor("GREEN")
                    .setFooter("#Ancient Luna")
                user.send(addBDO)
                const addBDOmsg = new MessageEmbed()
                    .setDescription('Role **<@&856380073745186876>** added!')
                message.channel.send(addBDOmsg).then((msg) => {
                  setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole);
                const addAPEX = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription("You have been gived **Apex** role and have access to **Apex Legends** category")
                    .setTimestamp()
                    .setColor("GREEN")
                    .setFooter("#Ancient Luna")
                user.send(addAPEX)
                const addAPEXmsg = new MessageEmbed()
                    .setDescription('Role **<@&861400119101095937>** added!')
                message.channel.send(addAPEXmsg).then((msg) => {
                  setTimeout(() => { msg.delete() }, 5000)
                });
            }
        } else {
            return;
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BlackDesertOnlineRole);
                const removeBDO = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/etMSX3u.png")
                    .setDescription("Your **Agma** role were taken away from you since you unreacted and has no longer access to **Black Desert Online** category anymore")
                    .setTimestamp()
                    .setColor("RED")
                    .setFooter("#Ancient Luna")
                user.send(removeBDO)
                const removeBDOmsg = new MessageEmbed()
                    .setDescription('Role **<@&856380073745186876>** removed!')
                message.channel.send(removeBDOmsg).then((msg) => {
                  setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole);
                const removeAPEX = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription("Your **Apex** role were taken away from you since you unreacted and has no longer access to **Apex Legends** category anymore")
                    .setTimestamp()
                    .setColor("RED")
                    .setFooter("#Ancient Luna")
                user.send(removeAPEX)
                const removeAPEXmsg = new MessageEmbed()
                    .setDescription('Role **<@&861400119101095937>** removed!')
                message.channel.send(removeAPEXmsg).then((msg) => {
                  setTimeout(() => { msg.delete() }, 5000)
                });
            }
        } else {
            return;
        }
    });

    message.delete()
}

module.exports.help = {
    name: 'setrolensubmit'
}