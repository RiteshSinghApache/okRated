
const fs = require('fs-extra');
const path = require('path');

const ensureDirectory = async (dir) => {
  try {
    await fs.ensureDir(dir);
  } catch (err) {
    console.error(`Failed to create directory ${dir}:`, err);
    throw err;
  }
};

module.exports = { ensureDirectory };
