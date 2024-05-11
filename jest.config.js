module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/prisma/(.*)$": "<rootDir>/app/prisma/$1",
  }
};
