require("dotenv").config();

module.exports = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    guildId: process.env.DISCORD_GUILD_ID,
  },

  google: {
    appsScriptUrl: process.env.APPS_SCRIPT_URL,
    spreadsheetId: process.env.SPREADSHEET_ID,

    sheets: {
      database: process.env.SHEET_DATABASE,
      newsystem: process.env.SHEET_NEWSYSTEM,
      milestone: process.env.SHEET_MILESTONE,
    },
  },

  bot: {
    ownerId: process.env.BOT_OWNER_ID,
    prefix: process.env.BOT_PREFIX,
  },

  finance: {
    defaultRate: Number(process.env.DEFAULT_RATE),
    defaultCurrency: process.env.DEFAULT_CURRENCY,
  },

  log: {
    channelId: process.env.LOG_CHANNEL_ID,
    errorChannelId: process.env.ERROR_CHANNEL_ID,
  },

  version: process.env.BOT_VERSION,
};