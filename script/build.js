const { exec } = require('node:child_process');
const fs = require('fs').promises;
const fsCostants = require('fs').constants; 

const outputDir = './dist/libs/ngx-taiui';
const nodeMules = './node_modules/ngx-taiui/';
const platform = process.platform;

console.log('Build on %s platform...', platform);


async function run() {
    try {
        if(!await fs.access(outputDir, fsCostants.F_OK) && (await fs.stat(outputDir)).isDirectory()) {
            console.log('Delete older output files...');
            await fs.rm(outputDir, {recursive: true});
        }
    }
    catch (error) {
    }

    try {
        if(!await fs.access(nodeMules, fsCostants.F_OK) && (await fs.stat(nodeMules)).isDirectory()) {
            console.log('Delete older node_modules files...');
            await fs.rm(nodeMules, {recursive: true});
        }    
    }
    catch(error) {}

    console.log('Starting build with develop option...');

    exec('nx run ngx-taiui:build:development', (error, output) => {
        if(error) {
            console.log('Error ', error);
            return;
        }

        console.log('Library builded!');
        console.log('Strating build tailwind css...');

        exec('tailwindcss -c libs/ngx-taiui/tailwind.config.js -i ./libs/ngx-taiui/src/lib/ngx-taiui.scss -o ./dist/libs/ngx-taiui/ngx-taiui.scss -m', async (error, output) => {
            if(error) {
                console.log(error);
                return;
            }

            await fs.cp(outputDir, nodeMules, {recursive: true});
            console.log('Tailwind css builded!');
        })
    })
}

run().then();