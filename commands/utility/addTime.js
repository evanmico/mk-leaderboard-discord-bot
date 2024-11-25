import { SlashCommandBuilder } from "discord.js";
import leaderboardEmbed from "../../embeds/leaderboard.js";

import { table } from 'text-table.js';
//the dumb__filename and __dirname import to make them functional :|
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rows = import(join(__dirname, 'data', 'times.json'));


const data = new SlashCommandBuilder()
                .setName('add-time')
                .setDescription('Allows any player to set a new time')
                .addStringOption(option =>
                    option.setName('time')
                        .setDescription('your new time')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('track')
                        .setDescription('Specify a particular track')
                        .setRequired(true));

const execute = async (interaction) => {
    const track = interaction.options.getString('track');
    const time = interaction.options.getString('time');
    leaderboardEmbed.fields.push(
        {
            name: '\u200b',
            value: '1',
            inline: true,
        },
        {
            name: '\u200b',
            value: `${interaction.user.username}`,
            inline: true,
        },
        {
            name: '\u200b',
            value: `${time}`,
            inline: true,
        },
        {
            name: '\u200b',
            value: `${track}`,
            inline: true,
        },
        {
            name: '\t',
            value: '\t',
        },
    )
    rows.push({})
    await interaction.channel.send({embeds: [leaderboardEmbed]});
    await interaction.reply({ content: 'time added successfully and leaderboard refreshed', ephemeral: true});
}

export{
    data,
    execute
}