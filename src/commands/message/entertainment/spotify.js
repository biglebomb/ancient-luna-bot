const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const canvacord = require('canvacord');

module.exports = new Object({
    name: "spotify",
    description: "spotify.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        let target = message.mentions.members.first();

        // if (target.bot) return await message.reply({ content: "Well, it is a BOT. You cant track them" })

        if (!target) {
            message.react("❓").catch((e) => { });
            return message.reply({ content: "How can I track when theres none. Mention one" }).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 5000);
            });
        }

        let status;
        if (target.presence.activities.length === 1) status = user.presence.activities[0];
        else if (target.presence.activities.length > 1) status = user.presence.activities[1];

        if (target.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            return await message.reply({ content: `${target.user.username} is not listening spotify` })
        }

        if (status !== null && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
            name = status.details,
            artist = status.state,
            album = status.assets.largeText

            const card = new canvacord.Spotify()
            .setAuthor(artist)
            .setAlbum(album)
            .setStartTimestamp(status.timestamps.start)
            .setEndTimestamp(status.timestamps.end)
            .setImage(image)
            .setTitle(name)

            const Card = await card.build();
            const attachments = new AttachmentBuilder(Card, { name: "Spotify.png" })

            const embed = new EmbedBuilder()
            .setTitle(`Spotify track`)
            .setImage(`attachments://spotify.png`)
            .setTimestamp()
            .setFooter({ text: `Spotify Tracker` })

            await message.reply({
                embed: [embed],
                files: [attachments]
            })
        }
    }
});