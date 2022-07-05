module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"], //테스트 하지 않는 경로
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1", //경로의 이름과 실제 경로 설정
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
