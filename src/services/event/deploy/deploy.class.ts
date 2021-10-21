//@ts-ignore no type library
import download from 'download-git-repo';
import { Application } from '../../../declarations';
import { executeCommand } from '../../../utilities';

export class Deploy {
  constructor(private app: Application) {}

  async create(data: Record<string, any>) {
    const { githubUser, repo, branch, name, port } = data;

    // Kill process running on port
    await executeCommand(`npx kill-port ${port}`);

    // Delete code in existing folder if it exists
    try {
      await executeCommand(`sudo rm -R /home/pi/apps/${name}`);
    } catch(e) {}
    
    // Download source code
    download(`${githubUser}/${repo}#${branch}`, `'home/pi/apps/${name}`, function (err: Error) {
      console.log(err ? 'Error' : 'Success')
    });

    // Install node modules
    await executeCommand(`cd /home/pi/apps/${name} && npm i`);

    // Start server
  }
}
