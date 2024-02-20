import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
                .setName('user')
                .setDescription('Provides information about the user.');

const execute = async (interaction) => {
    // interaction.user is the object representing the user who ran the command
    // interaction.member is the GuildMember (discord server) object, which represents the user in the specific guild (discord server)
    await interaction.reply(`This command was initiated by ${interaction.user.username}, a member as of ${interaction.member.joinedAt}.`);
};

export {
    data, 
    execute
};