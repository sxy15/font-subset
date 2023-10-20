import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path"
import { cwd } from "node:process"
import { logger } from 'rslog'
import opentype from 'opentype.js'
import { presetText } from "./index.js";

export interface FontConfig {
    fontPath: string;
    text: string;
    preset: boolean;
    output: {
        path: string;
        name: string;
    };
}

export function generator(option: string){
    const ops = option || './subset.config.json';
    const configPath = resolve(cwd(), ops);
    const _dirname_ = dirname(configPath);
    
    try {
        const config: FontConfig = JSON.parse(readFileSync(configPath, 'utf8') || '{}')
        const { fontPath, text, preset, output } = config;

        if (!fontPath) {
            logger.error('fontPath is required');
            return;
        }

        const subsetText = preset ? `${text}${presetText}` : text;
        const subsetTextTrim = subsetText.replace(/\s*/g, '').replace(/[\r\n]/g, '');

        if(!subsetTextTrim) {
            logger.error('text is required');
            return;
        }

        const fontBuffer = new Uint8Array(readFileSync(resolve(_dirname_, fontPath))).buffer;
        const font = opentype.parse(fontBuffer);
        const postScriptName = font.getEnglishName('postScriptName');
        const [fontFamily, fontSubFamily] = postScriptName.split('-');
        const notdefGlyph = font.glyphs.get(0);
        notdefGlyph.name = '.notdef';

        const subsetTextString = subsetTextTrim.split('').reduce((acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]), []).join('');

        const subGlyphs = [notdefGlyph, ...font.stringToGlyphs(subsetTextString)];

        const subsetFont = new opentype.Font({
            familyName: fontFamily,
            styleName: fontSubFamily,
            unitsPerEm: font.unitsPerEm,
            ascender: font.ascender,
            descender: font.descender,
            version: font.version,
            glyphs: subGlyphs,
        });

        const { path, name } = output || { path: './', name: 'subset' };

        writeFileSync(resolve(cwd(), path, `${name}.otf`), Buffer.from(subsetFont.toArrayBuffer()));

        logger.success(`subset font file generate success, path: ${resolve(cwd(), path, `${name}.otf`)}`);
       
    } catch (err) {
        logger.error('config file parse fail',err);
    }
}
