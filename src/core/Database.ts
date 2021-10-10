import { AutoResponseModel } from "../models/Autoresponse";

export abstract class Database {
    public static async createGuildTrigger(guildID: string, name: string, content: string) {
        const model = new AutoResponseModel({
			guildID: guildID,
			name: name,
			content: content,
		});

		await model.save().catch((err: Error) => console.error(err.stack));
		return { guildID, name, content };
    }

    public static async deleteGuildTrigger(guildID: string, name: string) {
        const model = await AutoResponseModel.findOne({ guildID: guildID, name: name });

		if (!model) return;
		
        await model.deleteOne();

		return { guildID, name };
    }
}