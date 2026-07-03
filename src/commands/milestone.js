const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("milestone")
    .setDescription("Check Milestone")

    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("ID")
        .setRequired(true)
    ),

  async execute(interaction) {

    const payload = {

      type: "milestone",

      id: interaction.options.getString("id")

    };

    await interaction.reply({

      content: "⏳ Mengambil Milestone...",

      flags: 64

    });

    try {

      const response = await fetch(process.env.APPS_SCRIPT_URL, {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(payload)

      });

      const result = await response.text();

      await interaction.editReply({

        content: result

      });

    }

    catch (err) {

      console.error(err);

      await interaction.editReply({

        content: "❌ Gagal mengambil Milestone."

      });

    }

  }

};