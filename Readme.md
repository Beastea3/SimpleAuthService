# Simple Auth Service

##How to run locally:

1. Recommended Node version: `v16.x.x`;
2. Run `npm install`;
3. To integrate to your own project, copy this folder, and import this as an CommonJS Module;
4. Run `npm run test` to see all test cases and test locally;

## Developing guide

- `storage/AuthStorage`: This is a general storage to store entities such as `Token`, `User` and `Role`;
- `types/*`: This folder defines several types used in this project;
- `AuthService.js`: Main Class of this project, you can read thiw project from this project; 
- `test`: This folder contains tests involved in this project;
  
  - `/test`: Main work flow;
  - `/boundary`: Some boundary tests, currently has written one case only;


## Dependencies

- `md5`: To generate secret and hash password;
- `mocha`: To Unit Test, required only in developing;