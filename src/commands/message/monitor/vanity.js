const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "vanity",
    description: "vanity.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: ['vanity'],
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

        await message.delete().catch((e) => { });

        const IMGVanity = new AttachmentBuilder("src/assets/bdo/civilization_vanity.png")

        let embedVanity = new EmbedBuilder()
            .setDescription(`**WORLD BOSS ALERTS** <:bosstimer:1085384679261220974> \`(SEA REGION)\`\n\n<:xu_boss_kzarka:1085378897559957504> Kzarka <:xu_boss_kutum:1085378907806642286> Kutum <:xu_boss_nouver:1085378901510979594> Nouver <:xu_boss_karanda:1085378915234742353> Karanda <:xu_boss_murakanquint:1085378928585216143> Muraka & Quint\n<:xu_boss_offin:1085378921991770202> Offin <:xu_boss_garmoth:1085378935136718928> Garmoth <:xu_boss_vell:1085381103403147344> Vell`)
            .setColor("2b2d31")

        await message.channel.send({ files: [IMGVanity], embeds: [embedVanity] }).catch(e => { });
    }
})



