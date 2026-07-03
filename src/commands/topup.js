const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("topup")
    .setDescription("Send topup to Google Sheets")

    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("ID Discord")
        .setRequired(true)
    )

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

    .addStringOption(option =>
      option
        .setName("remarks")
        .setDescription("Remarks")
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

      type: "topup",

      id: interaction.options.getString("id"),

      server: interaction.options.getString("server"),

      remarks: interaction.options.getString("remarks"),

      nominal: interaction.options.getNumber("nominal")

    };

    await interaction.reply({

      content: "⏳ Sending Topup...",

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
`✅ TOPUP BERHASIL

ID : ${payload.id}
Server : ${payload.server}
Remarks : ${payload.remarks}
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