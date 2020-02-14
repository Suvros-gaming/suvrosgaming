const { RichEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports = {
    name:"report",
    category: "moderation",
    description: "Reports a member",
    usge: "<mention | id>",
    run: async (client, mesage, args) => {
        if (mesage.deleteable) mesage.delete();

        let rMember = mesage.mentions.members.first() || mesage.guild.members.get(args[0]);

        if (!rMember)
            return mesage.reply("Sorry, can't find him 😐").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return mesage.reply("He/She is a Moderator 😎").then(m => m.delete(5000));

        if (!args[1])
            return mesage.channel.send("Please write the reason first 😒").then(m => m.delete(5000));

        const channel = mesage.guild.channels.find(channel => channel.name === "⁂┃reports");

        if (!channel)
            return mesage.channel.send("Failure! Can't find \`#⁂┃reports\` channel !!!").then(m => m.delete(5000));

        const embed = new RichEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(mesage.guild.name, mesage.guild.iconURL)
        .setAuthor("Reported member", rMember.user.displayAvatarURL)
        .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.id})
        **> Reported by:** ${mesage.member} (${mesage.member.id})
        **> Reported in:** ${mesage.channel}
        **> Reason:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);


    }
}