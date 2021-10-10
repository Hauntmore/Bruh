export abstract class Utils {
    /**
     * Gets a random number between the minimum parameter and the maximum parameter (both inclusive).
     * @param {number} min The minimum number. 
     * @param {number} max  The maximum number.
     * @returns {number} The random number.
     */
    public static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate a pyramid with a height of the given integer.
     * @param {number} size The height to generate the pyramid.
     * @returns {string} A pyramid with the given height.
     */
    public static pyramid(size: number = 5): string {
        const a = new Array(size).fill("*").map((r: string, i: number) => (r.repeat(i + 1)).padStart(size));
        return a.map((r: string, i: number) => r + (a.map(r => r.split("").reverse().join("").substring(1) )[i])).join("\n");
    }

    /**
     * Formats a Discord Permissions to be more readable.
     * @param {string} permission A Discord permission name.
     * @returns {string} The formatted permission.
     */
    public static formatPermissions(permission: string): string {
        return permission
		.replace(/_/g, " ")
		.replace(/guild/ig, "server")
        .title();
    }
}