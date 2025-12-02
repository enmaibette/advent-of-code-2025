import * as fs from 'fs';

export function readFiles(path: string): string {
    return fs.readFileSync(path, 'utf8');
}