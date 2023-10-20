import fs from 'node:fs';
import { URL, fileURLToPath } from 'node:url';

const pkgPath = fileURLToPath(new URL('../package.json', import.meta.url));
const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

export const cliVersion = pkgJson.version;

export const defaultNumber = "0123456789";

export const defaultLetter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const defaultSymbol = "~!@#$%^&*()_+-={}[]\\|:;'\"<>/?.,";

export const presetText = `${defaultNumber}${defaultLetter}${defaultSymbol}`;
