import { exec } from 'child_process';
import * as path from 'path';
import { promises as fs } from 'fs';
import { promisify } from 'util';

const WORLDS = [
    "snikes.dcl.eth",
    "snikes.crossverse.eth"
]

const PRIVATE_KEY = "6debfacd7910a7a323b493afdce80b673547e13fa8dc965c0d3a8dd79ee2f967"
const TARGET = "https://worlds-content-server.decentraland.org"

const filePath = path.join(__dirname, 'scene.json');


const execPromise = promisify(exec);


// Build the scene
const buildScene = async () => {
    console.log('Building the scene...');

    try {
        const { stdout, stderr } = await execPromise("npm run build");
        console.log(`Stdout: ${stdout}`);
    } catch (error) {
        throw new Error(`Error building the scene: ${error}`);
    }

    console.log('Scene built successfully.');
};


const deployScene = async (world: string) => {
    console.log(`Deploying the scene to ${world}...`);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        jsonData.worldConfiguration = {
            "name": world
        };

        const updatedJsonData = JSON.stringify(jsonData, null, 2);
        await fs.writeFile(filePath, updatedJsonData, 'utf8');
        console.log('File has been updated successfully.');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

    await execPromise(`DCL_PRIVATE_KEY=${PRIVATE_KEY} npm run deploy --skip-build -- --target-content ${TARGET}`).catch((error) => {
        throw new Error(`Error deploying the scene: ${error}`);
    })
    console.log('Scene deployed successfully.');
}

async function main() {
    await buildScene();
    for (const world of WORLDS) {
        await deployScene(world);
    }
}

main();