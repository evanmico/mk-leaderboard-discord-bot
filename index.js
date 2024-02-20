import "dotenv/config";
import fs from 'node:fs';

//Add required discord.js classes
import { Client, Collection, /*Events,*/ GatewayIntentBits } from 'discord.js';
const botToken = process.env.BOT_TOKEN;

//the dumb__filename and __dirname import to make them functional :|
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
/*
client.once(Events.ClientReady, readyClient => {
    console.log(`All good! Signed in as ${readyClient.user.tag}`);
});
*/
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const { data, execute } = await import(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ( data && execute ) {
            client.commands.set(data.name, execute);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
};


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { name, once, execute } = await import(filePath);

    if (once) {
        client.once(name, (...args) => execute(...args));
    } else {
        client.on(name, (...args) => execute(...args));
    }
}

//Login to Discord with your client's token
client.login(botToken);


/*
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const execute = interaction.client.commands.get(interaction.commandName);

    if (!execute) {
        console.error(`No command matching ${interaction.commandName} was found.`);
    }

    try {
        await execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemral: true });
        }
    }
    console.log(interaction);
});*/