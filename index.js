const { Client, Collection, RichEmbed } = require("discord.js");


const prefix = "*";

const client = new Client({
    disableEveryone: false
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});


client.on("ready", ()=>{
    console.log("Bot refreshed!");
    client.user.setActivity('Over the server', { type: 'WATCHING' });
        
    
});

client.on("message", async message =>{
    if(message.author.bot)return;
    if(!message.guild)return;
    if(!message.content.startsWith(prefix))return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
    
});

client.login(process.env.token);
