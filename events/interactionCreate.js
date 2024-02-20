import { Events } from 'discord.js';

const name = Events.InteractionCreate;
const execute = async (interaction) => {
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
};

export {
    name,
    execute
};