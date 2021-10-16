import { Utils } from "../core/Utils";

Array.prototype.random = function (): Array<any> {
  return this[Utils.random(0, this.length)];
};

String.prototype.title = function (): string {
  const str: string[] = this.toLowerCase().split(/ +/);

  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }

  return str.join(" ");
};
