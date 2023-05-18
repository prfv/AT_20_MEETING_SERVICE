/**
*@generateToken.js
*Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
*Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
*All rights reserved
*This software is the confidential and proprietary information of
*Jalasoft, Confidential Information You shall not
*disclose such Confidential Information and shall use it only in
*accordance with the terms of the license agreement you entered into
*with Jalasoft
**/
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

/**
     * The function generates a JSON Web Token (JWT) using a private key and user information.
     * @param privateKey - The private key used to sign the JWT (JSON Web Token).
     * @returns The function `generate` returns a JSON Web Token (JWT) signed with the provided private
     * key and containing the specified payload data, including the user's ID, name, email, avatar, and
     * moderator status, as well as features such as livestreaming, recording, transcription, and
     * outbound calling. The JWT also includes an expiration time and a not-before time, and is signed
     * using the RS256
     **/
const generate = (privateKey, { id, name, email/*, avatar*/, appId, kid, host, roomName, start_time, end_time  }) => {
    const start_time2 = new Date(new Date(start_time).toISOString().split('.')[0]);
    const end_time2 = new Date(new Date(end_time).toISOString().split('.')[0]);
    const jwt = jsonwebtoken.sign({
        aud: 'jitsi',
        context: {
            user: {
                id,
                name,
                // avatar,
                email,
                moderator: host
            },
            features: {
                livestreaming: 'true',
                recording: 'true',
                transcription: 'true',
                'outbound-call': 'true'
            }
        },
        iss: 'chat',
        room: roomName,
        sub: appId,
        exp: Math.round(end_time2.setMinutes(end_time2.getMinutes() + 15) / 1000),
        nbf: (Math.round((start_time2).getTime() / 1000) - 10)
    }, privateKey, { algorithm: 'RS256', header: { kid } });
    return jwt;
};



const generateToken = (user, meeting) => {

    // console.log(user);
    /**
    * `const privateKey = fs.readFileSync('src/models/Key 4_18_2023, 12_48_12 PM.pk', 'utf8');` is
    * reading the contents of a private key file located at `'src/models/Key 4_18_2023, 12_48_12
    * PM.pk'` and storing it in the `privateKey` constant. The `readFileSync` method is used to
    * synchronously read the file and the `'utf8'` encoding is specified to ensure that the contents
    * of the file are returned as a string. The private key is later used to sign the JSON Web Token
    * (JWT) in the `generate` function.
    **/
     const privateKey = fs.readFileSync('src/models/Key 4_25_2023, 1_44_35 PM.pk', 'utf8');
    // console.log(privateKey);
    /**
    * This code is generating a JSON Web Token (JWT) using the `jsonwebtoken` library in Node.js. The
    * `generateToken` function takes in several parameters such as `userId`, `userName`, `userEmail`,
    * `userImage`, `userRole`, and `roomName`. It then uses a private key stored in a file to sign the
    * JWT with the provided payload data. The resulting token is returned by the function and can be
    * used for authentication and authorization purposes. The `token` variable is assigned the value
    * returned by the `generate` function, which takes in the `privateKey` and an object containing
    * the payload data.
    **/
    const token = generate(privateKey, { // Pass your generated private key
        id: user.id, // You can generate your own id
        name: user.name, // Set the user name
        email: user.email, // Set the user email
        host: user.host,
        // avatar: userImage, // Set the user avatar
        appId: 'vpaas-magic-cookie-e30d3fecc3564383a099d19e7275b56d', // Your AppID
        kid: 'vpaas-magic-cookie-e30d3fecc3564383a099d19e7275b56d/c3f8b8',
        start_time: meeting.start_time,
        end_time: meeting.end_time, // Set the api key, see https://jaas.8x8.vc/#/apikeys for more info.
        roomName: meeting._id
    });

    return token;
};
module.exports = generateToken;
