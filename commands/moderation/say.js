const { RichEmbed } = require("discord.js");
module.exports = {
    name: "say",
    aliases: [],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: async (client, message, args) => {

        // No author permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ You do not have permissions to use the command")
                .then(m => m.delete(5000));
        }

        if(message.deletable) message.delete();

        if(args.length < 1)
        return message.reply(" Nothing to say? ").then(m => m.delete(5000));
        const roleColor = message.guild.me.displayHexColor;

        if(args[0].toLowerCase() === "embed"){
            const embed = new RichEmbed()
                .setColor("RANDOM")
                .setDescription(args.slice(1).join(" "));

            message.channel.send(embed);

        }
        else{
            message.channel.send(args.join(" "));
        }
    }
    
}