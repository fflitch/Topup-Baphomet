require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

// =====================================
// LOAD COMMANDS
// =====================================

const commandsPath = path.join(__dirname, "src/commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

  console.log("Loading :", file);

  const command = require(`./src/commands/${file}`);

  console.log("Command :", command.data.name);

  client.commands.set(command.data.name, command);

}

console.log("Loaded Commands :", [...client.commands.keys()]);

// =====================================
// READY
// =====================================

client.once("ready", () => {
  console.log(`🤖 Bot Online : ${client.user.tag}`);
});

// =====================================
// INTERACTION
// =====================================

client.on("interactionCreate", async (interaction) => {

  if (!interaction.isChatInputCommand()) return;

  console.log("Slash :", interaction.commandName);

  const command = client.commands.get(interaction.commandName);

  if (!command) {

    console.log("NOT FOUND :", interaction.commandName);

    return interaction.reply({
      content: "❌ Command tidak ditemukan",
      flags: 64,
    });

  }

  try {

    await command.execute(interaction);

  } catch (err) {

    console.error(err);

    if (!interaction.replied) {

      await interaction.reply({
        content: "❌ Error saat menjalankan command",
        flags: 64,
      });

    }

  }

});

client.login(process.env.DISCORD_TOKEN);