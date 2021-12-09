var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var _a = require('discord.js'), Client = _a.Client, Intents = _a.Intents, MessageEmbed = _a.MessageEmbed;
var token = require('./config.json').token;
var client = new Client({ intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ] });
console.log(Intents.FLAGS);
client.once('ready', function () {
    console.log("Ludus Bot! 🤖🕹️");
});
client.on('interactionCreate', function (interaction) { return __awaiter(_this, void 0, void 0, function () {
    var commandName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isCommand())
                    return [2 /*return*/];
                commandName = interaction.commandName;
                console.log(interaction);
                if (!(commandName === 'countdown')) return [3 /*break*/, 2];
                return [4 /*yield*/, interaction.reply("Timer Start")];
            case 1:
                _a.sent();
                addTimer(interaction);
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
// client.on("messageCreate", (message) => {
// 	if (message.author.bot) return false; 
// 	console.log(message);
// 	console.log("🤖⭐🌈💕🎲🎮");
// });
function Timer(interaction) {
    this.channelID = interaction.channelId;
    this.flagTimes = [20, 10, 5, 0];
    this.flagged = [0, 0, 0, 0];
    this.flagMsgs = [
        "20 seconds remaining ⏲️",
        "10 seconds left! ⚡",
        "5 more seconds! 😓",
        "Done."
    ];
    this.startTime = Date.now();
    this.endTime = Date.now() + 30 * 1000;
    this.currentCounter = function () {
        return Math.max(this.endTime - Date.now(), 0) / 1000;
    };
    this.currentMsg = function () {
        return "Time Left:" + Math.floor(this.currentCounter()).toString();
    };
    this.sendMsg = client.channels.cache.get(this.channelID).send;
    this.checkAndNotify = function (client) {
        var timeLeft = this.currentCounter();
        console.log(timeLeft);
        for (var i = 0; i < this.flagged.length; i++) {
            if ((timeLeft <= this.flagTimes[i]) && (this.flagged[i] == 0)) {
                // this.sendMsg(this.flagMsgs[i]);
                client.channels.cache.get(this.channelID).send(this.flagMsgs[i]);
                //console.log(this.flagMsgs[i]);
                this.flagged[i] = 1;
                //console.log(this.flagged);
            }
        }
        if (timeLeft <= 0) {
            return true;
        }
        else {
            return false;
        }
        //client.channels.cache.get(this.channelID).send("End Of Timer!");
    };
}
var timers = [];
function addTimer(interaction) {
    timers.push(new Timer(interaction));
}
function manageTimers(client) {
    for (var i = timers.length - 1; i >= 0; i--) {
        //console.log(timers[i].currentMsg());
        if (timers[i].checkAndNotify(client)) {
            timers.splice(i, 1);
        }
    }
}
setInterval(manageTimers.bind(this, client), 1000);
client.login(token);
