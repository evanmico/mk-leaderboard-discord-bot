import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
                .setName('track-thread')
                .setDescription('Starts Tracking a Thread for Times')
                .addStringOption(option =>
                    option.setName('track')
                        .setDescription('The desired track for time trials')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('target-time')
                        .setDescription('The target time to shoot for')
                        .setRequired(true));

const execute = async (interaction) => {
    const track = interaction.options.getString('track');
    const targetTime = interaction.options.getString('target-time');
    interaction.reply(`Track: ${track} with target time ${targetTime}`);
}

export {
    data,
    execute
}