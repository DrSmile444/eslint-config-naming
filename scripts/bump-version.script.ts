import * as fs from 'node:fs';
import * as readline from 'node:readline';

interface PackageJSON {
  version: string;
}

// Helper function to read JSON file
const readJSONFile = (filePath: string): PackageJSON => {
  const rawData = fs.readFileSync(filePath);

  return JSON.parse(rawData.toString()) as PackageJSON;
};

// Helper function to write JSON file
const writeJSONFile = (filePath: string, data: unknown): void => {
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFileSync(filePath, `${jsonData}\n`);
};

// Function to update the version in package.json and registry/package.json
const updatePackageJSON = (filePath: string, newVersion: string): void => {
  const packageData = readJSONFile(filePath);

  packageData.version = newVersion;
  writeJSONFile(filePath, packageData);
  console.info(`Updated version in ${filePath} to ${newVersion}`);
};

// Main function to prompt the user and update the versions
const main = () => {
  const packageFilePath = 'package.json';

  const packageData = readJSONFile(packageFilePath);
  const currentVersion = packageData.version;

  console.info(`Current version: ${currentVersion}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the new version: ', (newVersion) => {
    updatePackageJSON(packageFilePath, newVersion);
    rl.close();
  });
};

main();
