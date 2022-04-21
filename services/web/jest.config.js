module.exports = {
  preset: "react-native",
  rootDir: "src",
  modulePaths: ["<rootDir>"],
  moduleDirectory: ["node_modules", "src"],
  testMatch: [
    "**/**.spec.(ts|tsx)",
  ],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  moduleNameMapper: {
    "@src/(.*)$": "<rootDir>/../src/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  coverageDirectory: ".jest-coverage",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
