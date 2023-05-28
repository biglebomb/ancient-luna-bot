const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const jsdom = require("jsdom");

module.exports.run = async (client, message, args) => {
    const survivorID = args.join(" ");
    if (!survivorID) return message.channel.send("Do `!status` `id`").catch((e) => {});

    const loadingTxt = await message.reply(`Getting player status <a:_util_loading:863317596551118858>`);

    let request = require('request')

    let option = {
        url: `https://www.dfprofiler.com/profile/json/${survivorID}`,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }

    request(option, function (err, responce, body) {
        if (typeof body !== 'undefined' && body) {
            let stat = JSON.parse(body)

            const domUsername = new jsdom.JSDOM(stat['username']);
            let username = domUsername.window.document.querySelector("a").textContent;

            const domHealth = new jsdom.JSDOM(stat['health']);
            let health = domHealth.window.document.querySelector("div").textContent;

            const domNourishment = new jsdom.JSDOM(stat['nourishment']);
            let nourishment = domNourishment.window.document.querySelector("div").textContent;

            let outpost = stat['outpost']

            let profession_level = stat['profession_level']
            let experience = stat['experience']

            let weekly_ts = stat['weekly_ts']
            let exp_since_death = stat['exp_since_death']

            let weekly_loot = stat['weekly_loot']
            let all_time_loot = stat['all_time_loot']

            let daily_tpk = stat['daily_tpk']
            let weekly_tpk = stat['weekly_tpk']
            let pvp_last_hit = stat['pvp_last_hit']

            let cash = stat['cash']
            let bank = stat['bank']

            let position = stat['gpscoords']

            let tradezone = stat['tradezone']
            let creation_date = stat['creation_date']
            let gm_end = stat['gm_end']
            let gold_member = stat['gold_member']

            let weapon_name_1 = stat['weapon_name_1']
            let weapon_name_2 = stat['weapon_name_2']
            let weapon_name_3 = stat['weapon_name_3']

            let weapon_info_1 = stat['weapon_info_1']
            let weapon_info_2 = stat['weapon_info_2']
            let weapon_info_3 = stat['weapon_info_3']

            let stat_strength = stat['stat_strength']
            let stat_accuracy = stat['stat_accuracy'].split(" ")
            let stat_critical_hit = stat['stat_critical_hit'].split(" ")
            let stat_reloading = stat['stat_reloading'].split(" ")

            let prof_melee = stat['prof_melee']
            let prof_pistols = stat['prof_pistols']
            let prof_rifles = stat['prof_rifles']
            let prof_shotguns = stat['prof_shotguns']
            let prof_machine_guns = stat['prof_machine_guns']
            let prof_explosives = stat['prof_explosives']

            let exp_boost = stat['exp_boost'].split("<\/i> ")
            let dmg_boost = stat['dmg_boost'].split("<\/i> ")
            let speed_boost = stat['speed_boost'].split("<\/i> ")

            try {
                const domArmor = new jsdom.JSDOM(stat['armor']);
                let armor = domArmor.window.document.querySelector("div").textContent;

                let stat_endurance = stat['stat_endurance'].split(" ")
                let stat_agility = stat['stat_agility'].split(" ")

                const embedEvent = new MessageEmbed()
                    .setDescription(`**${weekly_ts} EXP**\n↳ gained and counted while doing TS on this week ⁣ ⁣ ⁣\n**EXP Since Death** : ${exp_since_death} EXP`)
                    .setThumbnail(`https://i.imgur.com/ulP4oAd.png`)
                    .addFields(
                        { name: `**Daily TPK**`, value: daily_tpk, inline: true },
                        { name: `**Weekly TPK**`, value: weekly_tpk, inline: true },
                        { name: `**Last Hit By**`, value: pvp_last_hit, inline: true }
                    )

                const embed = new MessageEmbed()
                    .setTitle(`${username}`)
                    .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
                    .setDescription(`**${profession_level}** (${experience})\nPosition ${position} ▾`)
                    .addFields(
                        { name: `**Account Creation**`, value: creation_date, inline: true },
                        { name: `**GM End Date**`, value: gm_end, inline: true },
                        { name: `**Gold Member**`, value: gold_member, inline: true },
                        { name: `**Cash**`, value: cash, inline: true },
                        { name: `**Bank**`, value: bank, inline: true },
                        { name: `**Trade Zone**`, value: tradezone, inline: true },
                        { name: `**Health**`, value: health, inline: true },
                        { name: `**Nourishment**`, value: nourishment, inline: true },
                        { name: `**Outpost**`, value: outpost, inline: true },
                        { name: `**Primary Weapon**`, value: `${weapon_name_1}\n${weapon_info_1}`, inline: true },
                        { name: `**Secondary Weapon**`, value: `${weapon_name_2}\n${weapon_info_2}`, inline: true},
                        { name: `**Tertiary Weapon**`, value: `${weapon_name_3}\n${weapon_info_3}`, inline: true },
                        { name: `**Stats**`, value: `Strength: ${stat_strength}\nEndurance: ${stat_endurance[0]}\nAgility: ${stat_agility[0]}\nAccuracy: ${stat_accuracy[0]}\nCritical: ${stat_critical_hit[0]}\nReloading: ${stat_reloading[0]}`, inline: true },
                        { name: `**Proficiencies**`, value: `Melee: ${prof_melee}\nPistols: ${prof_pistols}\nRifles: ${prof_rifles}\nShotguns: ${prof_shotguns}\nMachineguns: ${prof_machine_guns}\nExplosives: ${prof_explosives}`, inline: true },
                        { name: `**Armor**`, value: armor, inline: true },
                        { name: `**+50% Exp Boost**`, value: exp_boost[1], inline: true },
                        { name: `**+35% Damage Boost**`, value: dmg_boost[1], inline: true },
                        { name: `**+35% Speed Boost**`, value: speed_boost[1], inline: true }
                    )
                    .setImage(`https://i.imgur.com/TMI3wTd.gif`)
                    .setFooter({ text: `Powered by Ancient Luna`, iconURL: 'https://i.imgur.com/vKo3PJm.png' })
                    .setColor('202225')
                    .setTimestamp()

                const btnProfile = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Dead Frontier Profile")
                        .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?action=profile;u=${survivorID}`)
                    )
                    .addComponents(
                        new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Send Message")
                        .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?action=pm;sa=send;u=${survivorID}`)
                    )
                    .addComponents(
                        new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Trade")
                        .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=27&memto=${survivorID}`)
                    )

                loadingTxt.edit({
                    content: '⁣',
                    embeds: [embedEvent, embed],
                    components: [btnProfile]
                }).catch((e) => {})
            } catch (error) {
                let noArmor = stat['armor']

                let stat_noEndurance = stat['stat_endurance']
                let stat_noAgility = stat['stat_agility']

                const embedEvent = new MessageEmbed()
                    .setDescription(`**${weekly_ts} EXP**\n↳ gained and counted while doing TS on this week ⁣ ⁣ ⁣\n**EXP Since Death** : ${exp_since_death} EXP`)
                    .setThumbnail(`https://i.imgur.com/ulP4oAd.png`)
                    .addFields(
                        { name: `**Daily TPK**`, value: daily_tpk, inline: true },
                        { name: `**Weekly TPK**`, value: weekly_tpk, inline: true },
                        { name: `**Last Hit By**`, value: pvp_last_hit, inline: true }
                    )

                const embed = new MessageEmbed()
                    .setTitle(`${username}`)
                    .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
                    .setDescription(`**${profession_level}** (${experience})\nPosition ${position} ▾`)
                    .addFields(
                        { name: `**Account Creation**`, value: creation_date, inline: true },
                        { name: `**GM End Date**`, value: gm_end, inline: true },
                        { name: `**Gold Member**`, value: gold_member, inline: true },
                        { name: `**Cash**`, value: cash, inline: true },
                        { name: `**Bank**`, value: bank, inline: true },
                        { name: `**Trade Zone**`, value: tradezone, inline: true },
                        { name: `**Health**`, value: health, inline: true },
                        { name: `**Nourishment**`, value: nourishment, inline: true },
                        { name: `**Outpost**`, value: outpost, inline: true },
                        { name: `**Primary Weapon**`, value: `${weapon_name_1}\n${weapon_info_1}`, inline: true },
                        { name: `**Secondary Weapon**`, value: `${weapon_name_2}\n${weapon_info_2}`, inline: true},
                        { name: `**Tertiary Weapon**`, value: `${weapon_name_3}\n${weapon_info_3}`, inline: true },
                        { name: `**Stats**`, value: `Strength: ${stat_strength}\nEndurance: ${stat_noEndurance}\nAgility: ${stat_noAgility}\nAccuracy: ${stat_accuracy[0]}\nCritical: ${stat_critical_hit[0]}\nReloading: ${stat_reloading[0]}`, inline: true },
                        { name: `**Proficiencies**`, value: `Melee: ${prof_melee}\nPistols: ${prof_pistols}\nRifles: ${prof_rifles}\nShotguns: ${prof_shotguns}\nMachineguns: ${prof_machine_guns}\nExplosives: ${prof_explosives}`, inline: true },
                        { name: `**Armor**`, value: noArmor, inline: true },
                        { name: `**+50% Exp Boost**`, value: exp_boost[1], inline: true },
                        { name: `**+35% Damage Boost**`, value: dmg_boost[1], inline: true },
                        { name: `**+35% Speed Boost**`, value: speed_boost[1], inline: true }
                    )
                    .setImage(`https://i.imgur.com/TMI3wTd.gif`)
                    .setFooter({ text: `Powered by Ancient Luna`, iconURL: 'https://i.imgur.com/vKo3PJm.png' })
                    .setColor('202225')
                    .setTimestamp()

                const btnProfile = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Dead Frontier Profile")
                        .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?action=profile;u=${survivorID}`)
                    )
                    .addComponents(
                        new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Send Message")
                        .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?action=pm;sa=send;u=${survivorID}`)
                    )
                    .addComponents(
                        new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Trade")
                        .setURL(`https://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=27&memto=${survivorID}`)
                    )

                loadingTxt.edit({
                    content: '⁣',
                    embeds: [embedEvent, embed],
                    components: [btnProfile]
                }).catch((e) => {});
            }
        } else {
            loadingTxt.edit({
                content: `Something wrong happened..\n**unable to send the status now**`
            }).catch((e) => {});
        }
    })
}

module.exports.help = {
    name: 'status'
}