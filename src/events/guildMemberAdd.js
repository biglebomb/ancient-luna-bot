const { EmbedBuilder } = require("discord.js");
const { profileImage } = require('discord-arts');

module.exports = new Object({
    name: "guildMemberAdd",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(client, member) {
        // if (member.user.bot) return;
        const role = member.guild.roles.cache.get(client.config.luxCastaId);
        await member.roles.add(role.id).catch((err) => util.printLog('error', err));
        const channel = member.guild.channels.cache.get(client.config.gatewayChannel);
        const profileBuffer = await profileImage(member.id, {
            overwriteBadges: true,
            customBadges: ['src/assets/badge/ancientluna.png'],
            customTag: 'welcome',
            customDate: '.gg/ancientluna',
            moreBackgroundBlur: true,
        });
        const welcomeImage = new AttachmentBuilder(profileBuffer, { name: `welcome-al.png` });
        const welcomeText = new EmbedBuilder()
            .setTitle(`Welcome to ${member.guild.name}`)
            // .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`<@${member.user.id}> please understand our **wisdom of lleud** at ${member.guild.channels.cache.get(client.config.ruleChannel).toString()} as you make your way through this warm sanctuary`)
            .setFooter({ text: `${member.user.username} visited the sanctuary` })
            .setImage(`attachment://welcome-al.png`)
            .setColor('7289da')
            .setTimestamp();
        return channel.send({ embeds: [welcomeText], files: [welcomeImage] });
    }
})