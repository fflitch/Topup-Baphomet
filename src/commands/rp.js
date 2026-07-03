const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("rp")
    .setDescription("Report Payment")

    .addStringOption(option =>
      option
        .setName("server")
        .setDescription("Server")
        .addChoices(
          { name: "V1", value: "V1" },
          { name: "V2", value: "V2" },
          { name: "V1 THUMB", value: "V1 THUMB" }
        )
        .setRequired(true)
    ),

  async execute(interaction) {

    const payload = {

      type: "rp",

      server: interaction.options.getString("server")

    };

    await interaction.reply({

      content: "⏳ Mengambil Report Payment...",

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

        content: "❌ Gagal mengambil Report Payment."

      });

    }

  }

};