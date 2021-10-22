//@ts-ignore no type library
import download from 'download-git-repo';
import { promisify } from 'util';
import { Application } from '../../../declarations';
import { executeCommand } from '../../../utilities';

const downloadAsync = promisify(download);

export class Deploy {
  constructor(private app: Application) {}

  async create(data: Record<string, any>) {
    const { githubUser, repo, branch, name, port, startCommand } = data;

    // Kill process running on port
    await executeCommand(`npx kill-port ${port}`);

    // Delete code in existing folder if it exists
    try {
      await executeCommand(`sudo rm -R /home/pi/apps/${name}`);
    } catch(e) {}
    
    // Download source code
    await downloadAsync(`${githubUser}/${repo}#${branch}`, `../${name}`);

    // Install node modules
    await executeCommand(`cd /home/pi/apps/${name} && npm i`);

    // Start server
    return { success: true };
  }
}
