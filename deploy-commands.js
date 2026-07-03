require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [

  // =====================================
  // PING
  // =====================================
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test bot"),

  // =====================================
  // TOPUP
  // =====================================
  new SlashCommandBuilder()
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

  // =====================================
  // PAYMENT
  // =====================================
  new SlashCommandBuilder()
    .setName("payment")
    .setDescription("Input payment ke Database")

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
        .setDescription("Nominal Payment")
        .setRequired(true)
    ),

  // =====================================
  // INDODAX
  // =====================================
  new SlashCommandBuilder()
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

  // =====================================
  // RP
  // =====================================
  new SlashCommandBuilder()
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

  // =====================================
  // MILESTONE
  // =====================================
  new SlashCommandBuilder()
    .setName("milestone")
    .setDescription("Check Milestone")

    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("ID")
        .setRequired(true)
    ),

  // =====================================
  // CLAIM
  // =====================================
  new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claim Milestone")

    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("ID")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("remarks")
        .setDescription("Remarks")
        .setRequired(true)
    )

].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {

  try {

    console.log("Deploying Slash Commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Slash Commands Deployed");

  }

  catch (err) {

    console.error(err);

  }

})();