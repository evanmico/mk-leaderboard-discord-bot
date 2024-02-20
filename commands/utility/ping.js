import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
                .setName('ping')
                .setDescription('Replies with the wll known counter...');

const execute = async (interaction) => {
    await interaction.reply('BONK!');
}


export {
    data,
    execute
};
