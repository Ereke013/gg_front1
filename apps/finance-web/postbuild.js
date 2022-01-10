const { hashElement } = require('folder-hash');

async function postBuild() {

  const args = JSON.parse(process.env.npm_config_argv);
  const indexOfBuild = args.original.indexOf('build');

  const projectName = args.original[indexOfBuild + 1] ? args.original[indexOfBuild + 1] : 'finance-web';

  const hash = await hashElement(`dist/apps/${projectName}`);
  console.log(`The MD5 sum of Dist is: ${hash.hash}`);
  const fs = require('fs');

  fs.mkdirSync(`dist/apps/${projectName}/non-cached/`);

  fs.writeFileSync(`dist/apps/${projectName}/non-cached/hash-sum.txt`, hash.hash);

  console.log(`Hash written`);

  if (fs.existsSync(`apps/${projectName}/version.txt`)) {
    fs.copyFileSync(`apps/${projectName}/version.txt`, `dist/apps/${projectName}/non-cached/version.txt`);
  }

  console.log(`Version.txt copied`);

  const child_process = require(`child_process`);

  const result = child_process.execSync(`git rev-parse HEAD`);

  fs.writeFileSync(`dist/apps/${projectName}/non-cached/git-id.txt`, result);

  console.log(`Last git commit hash written `);
}

postBuild().then();
