const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("saldo")
    .setDescription("Cek Saldo Indodax"),

  async execute(interaction) {

    const payload = {

      type: "saldo"

    };

    await interaction.reply({

      content: "⏳ Mengambil saldo Indodax...",

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

      console.log("STATUS :", response.status);
      console.log("OK :", response.ok);
      console.log("URL :", response.url);

      const result = await response.text();

      console.log("RESULT :", result);

      await interaction.editReply({

        content:
`💰 SALDO INDODAX

${result}`

      });

    }

    catch (err) {

      console.error(err);

      await interaction.editReply({

        content: "❌ Gagal mengambil saldo dari Google Apps Script."

      });

    }

  }

};