module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.test.ts'], // Look specifically for .test.ts files
  testPathIgnorePatterns: ['/node_modules/', '\\.js$'], // Ignore .js files
};



  