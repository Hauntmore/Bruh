export interface UserType {
    userID: string;
    cooldowns: object | any;
    premium: boolean;
};

export interface AutoresponseType {
    guildID: string;
    name: string;
    content: string;
}