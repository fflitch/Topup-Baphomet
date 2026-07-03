const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("payment")
    .setDescription("Send payment to Database")

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
    )

    .addNumberOption(option =>
      option
        .setName("nominal")
        .setDescription("Nominal")
        .setRequired(true)
    ),

  async execute(interaction) {

    const payload = {

      type: "payment",

      server: interaction.options.getString("server"),

      nominal: interaction.options.getNumber("nominal")

    };

    await interaction.reply({

      content: "⏳ Sending Payment...",

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
`✅ PAYMENT BERHASIL

Server : ${payload.server}
Nominal : ${payload.nominal}

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