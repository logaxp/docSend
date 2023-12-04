// const fs = require('fs').promises;
// const path = require('path');
// const { generateKeyPair } = require('crypto');
// const dotenv = require('dotenv');

// dotenv.config();

// const folderPath =  path.resolve(`${__dirname}/jwt_keys`);
// const JWT_PRIVATE_KEY = fs.readFileSync(`${folderPath}/jwtRS256.key`, 'utf8');
// const JWT_PUBLIC_KEY = fs.readFileSync(`${folderPath}/jwtRS256.key.pub`, 'utf8');
// const JWT_SECRET = process.env.SECRET_KEY;
// const TOKEN_TIME = process.env.TOKEN_TIME;

// module.exports = {
//   setJWTKeys: async () => {
//     const secret = process.env.SECRET_KEY;
//     const folderPath = path.resolve(`${__dirname}/jwt_keys`);

//     // Create the folder if it doesn't exist
//     try {
//       await fs.mkdir(folderPath, { recursive: true });
//       const { publicKey: publicKey_1, privateKey: privateKey_1 } = await new Promise((resolve, reject) => {
//         generateKeyPair('rsa', {
//           modulusLength: 4096,
//           publicKeyEncoding: {
//             type: 'spki',
//             format: 'pem',
//           },
//           privateKeyEncoding: {
//             type: 'pkcs8',
//             format: 'pem',
//             cipher: 'aes-256-cbc',
//             passphrase: secret,
//           },
//         }, (err, publicKey, privateKey) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve({ publicKey, privateKey });
//           }
//         });
//       });
//       await Promise.all([
//         fs.writeFile(path.join(folderPath, 'jwtRS256.key'), privateKey_1),
//         fs.writeFile(path.join(folderPath, 'jwtRS256.key.pub'), publicKey_1),
//       ]);
//       console.log('JWT keys generated successfully.');
//     } catch (error) {
//       console.error('Error generating JWT keys:', error);
//     }
//   },

//   encodeToken: async (object = {}) => {
//     const options = {
//       issuer: 'My App',
//       algorithm: 'RS256',
//       expiresIn: TOKEN_TIME,
//     };
//     const token = jwt.sign(
//       object,
//       { key: JWT_PRIVATE_KEY.replace(/\\n/gm, '\n'), passphrase: JWT_SECRET },
//       options,
//     );
//     return token;
//   },

//   verifyToken: (sentToken) => {
//       const options = {
//         issuer: 'My App',
//         algorithms: ['RS256'],
//         maxAge: TOKEN_TIME,
//       };
//       const userToken = jwt.verify(
//         sentToken,
//         JWT_PUBLIC_KEY.replace(/\\n/gm, '\n'),
//         options,
//         (err, decode) => {
//           if (err) {
//             return { tokenExp: true, error: err };
//           }
//           return { tokenExp: false, decode };
//         },
//       );
//       return userToken;
//   },

// }
