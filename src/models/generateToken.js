const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const generateToken = (userId, userName, userEmail, userImage, userRole, roomName) => {
    let moderatorValue = 'false';
    if (userRole == 'host') {
        moderatorValue = 'true';
    }
    const generate = (privateKey, { id, name, eml, avatar, appId, kid }) => {
        const now = new Date();
        const jwt = jsonwebtoken.sign({
            aud: 'jitsi',
            context: {
                user: {
                    id,
                    name,
                    avatar,
                    email: eml,
                    moderator: moderatorValue
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
            exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
            nbf: (Math.round((new Date()).getTime() / 1000) - 10)
        }, privateKey, { algorithm: 'RS256', header: { kid } });
        return jwt;
    };
    const privateKey = fs.readFileSync('src/models/Key 4_18_2023, 12_48_12 PM.pk', 'utf8');

    const token = generate(privateKey, { // Pass your generated private key
        id: userId, // You can generate your own id
        name: userName, // Set the user name
        email: userEmail, // Set the user email
        avatar: userImage, // Set the user avatar
        appId: 'vpaas-magic-cookie-325753d5a9de49c393ada134def1a104', // Your AppID
        kid: 'vpaas-magic-cookie-325753d5a9de49c393ada134def1a104/dc6dc8' // Set the api key, see https://jaas.8x8.vc/#/apikeys for more info.
    });

    return token;
};
module.exports = generateToken;
