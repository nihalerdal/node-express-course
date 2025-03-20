const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("./temp.txt", `First line\n`);
    await writeFile("./temp.txt", `Second line\n`, { flag: "a" });
    await writeFile("./temp.txt", `Third line\n`, { flag: "a" });
  } catch (error) {
    console.log(`Error:`, error);
  }
};

const reader = async () => {
  try {
    const result = await readFile("./temp.txt", "utf-8");
    console.log(`File contents: /n`, result);
  } catch (error) {
    console.log(`Error:`, error);
  }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (error) {
    console.log(`Error:`, error);
  }
};
readWrite();
