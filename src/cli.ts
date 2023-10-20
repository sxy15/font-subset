import { Command } from 'commander';
import { cliVersion } from './index.js';

const program = new Command();

program
    .name('font-subset')
    .usage('-c <path>')
    .description('a command tool for generate font subset')
    .version(`font-subset ${cliVersion}`);

program
    .option('-c, --config <path>', 'the path of config file')
    .action(async ({ config }) => {
        const { generator } = await import('./generator.js');

        return generator(config);
    });

program.showHelpAfterError()

program.parse()