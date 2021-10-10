import { Client, ClientOptions, Collection, version, ColorResolvable } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { versions } from "process";
import { BaseError } from "./BaseError";
import { env } from "process";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { yellow, green } from "chalk";
import { botModerators, color, owners } from "../config/Config";
import mongoose, { ConnectOptions } from "mongoose";
import { customEmojis } from "../config/Emojis";
import { App } from "../helpers/API/App";

export class ClientBase extends Client {
    public defaultPrefix: string;

    public events: Collection<string, any>;
    public commands: Collection<string, any>;

    public owners: Array<string>;
    public botModerators: Array<string>;

    public color: ColorResolvable;

    public customEmojis: typeof customEmojis;

    public constructor(BaseOptions: ClientOptions) {
        super(BaseOptions);

        this.validate();

        this.defaultPrefix = env.DISCORD_BOT_DEFAULT_PREFIX;

        this.events = new Collection();
        this.commands = new Collection();

        this.owners = owners;
        this.botModerators = botModerators;

        this.color = color;

        this.customEmojis = customEmojis;
    }

    private validate() {
        if (versions.node < "16.10.0") throw new BaseError("Your NodeJS version must be greater than 16.10.0");

        if (version < "13.2.0") throw new BaseError("Your Discord.js version is less than 13.2.0!");
    }

    private loadEvents() {
        const files = readdirSync(join(__dirname, "../events")).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(join(__dirname, `../events/${file}`));

            this.events.set(event.name, event);

            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args, this));
            } else {
                this.on(event.name, (...args) => event.execute(...args, this));
            }
        }
    }

    private loadCommands() {
        const folders = readdirSync(join(__dirname, "../commands"));

        for (const folder of folders) {
            const files = readdirSync(join(__dirname, "../commands/", folder)).filter((file) => file.endsWith(".js") && !file.startsWith("index"));

            for (const file of files) {
                const command = require(join(__dirname, "../commands/", `${folder}/`, file));

                command.category = folder;

                this.commands.set(command.name, command);
            }
        }

        const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);

        (async () => {
            console.log(`${yellow.bold("REST API:")}\nApplication commands are beginning to refresh.`);

            const commands = this.commands.map(({ execute, ...data }) => data);

            await rest.put(
                Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID),
                { body: commands },
            );

            console.log(`${green.bold("REST API:")}\nApplication commands have finished refreshing.`);
        })();
    }

    private async createDBConnection(uri: string, options: object) {
        return await mongoose.connect(uri, options);

    }

    public start(token: string) {
        this.loadCommands();
        this.loadEvents();

        this.createDBConnection(process.env.MONGODB_DATABASE_CONNECTION_URL, ({ useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions));

        App();

        return super.login(token);
    }
}