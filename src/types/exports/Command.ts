export interface Command {
    name: string;
    description: string;
    usage?: Array<string> | string;
    options?: Record<string, any>;
    cooldown?: number | 0;
    ownerOnly?: boolean | false;
    botModeratorOnly?: boolean | false;
}