const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("indodax")
    .setDescription("Topup Saldo Indodax")

    .addNumberOption(option =>
      option
        .setName("nominal")
        .setDescription("Nominal USDT")
        .setRequired(true)
    )

    .addNumberOption(option =>
      option
        .setName("rate")
        .setDescription("Rate USDT")
        .setRequired(true)
    ),

  async execute(interaction) {

    const payload = {

      type: "indodax",

      nominal: interaction.options.getNumber("nominal"),

      rate: interaction.options.getNumber("rate")

    };

    await interaction.reply({

      content: "⏳ Mengirim Topup Indodax...",

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

        content:
`💰 INDODAX TOPUP BERHASIL

Nominal : ${payload.nominal} USDT
Rate : ${payload.rate}

${result}`

      });

    }

    catch (err) {

      console.error(err);

      await interaction.editReply({

        content: "❌ Gagal menghubungi Google Apps Script."

      });

    }

  }

};