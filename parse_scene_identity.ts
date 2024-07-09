import * as process from 'process';
import * as fs from 'node:fs/promises'
import * as path from 'path';

async function parseSceneIdentity() {
    if (SCENE_TYPE != "worlds" && SCENE_TYPE != "main") {
        console.error("Invalid argument. Please provide 'worlds' or 'main'.");
        process.exit(1);
    }
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        const jsonData = JSON.parse(data);

        if (SCENE_TYPE == 'worlds') {
            console.log(jsonData.worldConfiguration.name);
        }
        else {
            console.log(jsonData.scene.base);
        }
    } catch (error) {
        process.exit(1);
    }
}

if (process.argv.length < 3) {
  console.log('Usage: node parse_scene_identity.js scene_type');
  process.exit(1);
}


const SCENE_TYPE = process.argv[2];
const FILE_PATH = path.join(__dirname, 'scene.json');

parseSceneIdentity();



