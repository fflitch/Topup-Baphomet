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

    const url = process.env.APPS_SCRIPT_URL;

    const payload = {
      type: "topup",
      id: interaction.options.getString("id"),
      server: interaction.options.getString("server"),
      remarks: interaction.options.getString("remarks"),
      nominal: interaction.options.getNumber("nominal")
    };

    console.log("➡️ APPS SCRIPT URL:", url);
    console.log("➡️ PAYLOAD:", payload);

    await interaction.reply({
      content: "⏳ Sending Topup...",
      flags: 64
    });

    try {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      console.log("STATUS:", response.status);
      console.log("RESPONSE TEXT:", text);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${text}`);
      }

      await interaction.editReply({
        content:
`✅ TOPUP BERHASIL

ID : ${payload.id}
Server : ${payload.server}
Remarks : ${payload.remarks}
Nominal : ${payload.nominal}

RESPONSE:
${text}`
      });

    }

    catch (err) {

      console.error("❌ TOPUP ERROR:", err);

      await interaction.editReply({
        content:
`❌ GAGAL TOPUP

Error: ${err.message}

Cek:
- APPS_SCRIPT_URL
- Deploy /exec
- Logs VPS`
      });

    }

  }

};