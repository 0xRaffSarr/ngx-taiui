const { exec } = require('node:child_process');
const fs = require('fs').promises;
const fsCostants = require('fs').constants;

const outputDir = './dist/libs/ngx-taiui';
const nodeModules = './node_modules/ngx-taiui/';
const platform = process.platform;

let compileType = 'dev';

function loadParameter() {
    //check parameter
    if(process.argv.length > 2) {
        //check production mode build
        if(process.argv.includes('prod')) compileType = 'production';
    }
}

async function run() {

    loadParameter();

    console.log('Building in %s mode...', compileType);

    try {
        if(!await fs.access(outputDir, fsCostants.F_OK) && (await fs.stat(outputDir)).isDirectory()) {
            console.log('Delete older output files...');
            await fs.rm(outputDir, {recursive: true});
        }
    }
    catch (error) {
    }

    try {
        if(!await fs.access(nodeModules, fsCostants.F_OK) && (await fs.stat(nodeModules)).isDirectory()) {
            console.log('Delete older node_modules files...');
            await fs.rm(nodeModules, {recursive: true});
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

            if(compileType === 'dev') await fs.cp(outputDir, nodeModules, {recursive: true});
            console.log('Tailwind css builded!');
        })
    })
}

run().then();
