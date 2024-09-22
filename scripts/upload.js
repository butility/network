import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const loginToNpm = async () => {

    const loginCommand = 'npm login --scope=@butility'; // This will prompt to login in browser

    try {
        const { stdout } = await execPromise(loginCommand);
        console.log('Logged in to npm successfully:\n', stdout);
    } catch (error) {
        console.error('Error logging in to npm:', error);
        throw error;
    }
};

const bumpVersion = async (versionType) => {
    try {
        const { stdout } = await execPromise(`npm version ${versionType}`);
        console.log(`Version bumped successfully:\n`, stdout);
    } catch (error) {
        console.error(`Error bumping version to ${versionType}:`, error);
        throw error; 
    }
};

const uploadPackage = async () => {
    try {
        const { stdout } = await execPromise('npm publish --access public --scope=@butility');
        console.log('Package published successfully:\n', stdout);
    } catch (error) {
        console.error('Error publishing package:', error);
    }
};

const run = async (versionType) => {
    await loginToNpm();
    await bumpVersion(versionType);
    await uploadPackage();
};

const versionType = process.argv[2] || 'patch';

run(versionType);