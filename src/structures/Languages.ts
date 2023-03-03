import { Collection } from 'discord.js';
import { languages, supportedLang } from '../typings/tables';
import { query } from '../utils/database';
import { DatabaseTables } from '../typings/database';
import { embeds, buttons } from '../data/contents';

export class Languages {
    private _cache: Collection<string, supportedLang> = new Collection();
    constructor() {
        this.start();
    }
    public setLang(user_id: string, lang: supportedLang) {
        const exists = this._cache.has(user_id);
        this._cache.set(user_id, lang);

        if (exists) {
            return query(`UPDATE ${DatabaseTables.languages} SET lang='${lang}' WHERE user_id='${user_id}'`);
        } else {
            return query(`INSERT INTO ${DatabaseTables.languages} ( user_id, lang ) VALUES ('${user_id}', '${lang}')`);
        }
    }
    public getLang(user_id: string): supportedLang {
        return this._cache.get(user_id) ?? 'en';
    }

    private start() {
        this.fillCache();
    }
    private async fillCache() {
        const langs = await query<languages>(`SELECT * FROM ${DatabaseTables.languages}`);
        langs.forEach((lang) => {
            this._cache.set(lang.user_id, lang.lang);
        });

        return true;
    }

    public embed<Embed extends keyof typeof embeds>(user_id: string, embed: Embed): (typeof embeds)[Embed]['fr'] {
        return embeds[embed][this.getLang(user_id)];
    }
    public button<Button extends keyof typeof buttons>(
        user_id: string,
        button: Button
    ): (typeof buttons)[Button]['fr'] {
        return buttons[button][this.getLang(user_id)];
    }
    public get cache() {
        return this._cache;
    }
}
