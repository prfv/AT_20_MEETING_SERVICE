/**
*@tokenController.js
*Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
*Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
*All rights reserved
*This software is the confidential and proprietary information of
*Jalasoft, Confidential Information You shall not
*disclose such Confidential Information and shall use it only in
*accordance with the terms of the license agreement you entered into
*with Jalasoft
**/
const model = require('../models/interview_route');
const generateToken = require('../models/generateToken');

class TokenController{
    /**
     * Gets a valit token for a jitsi meeting.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object to be sent back to the client.
     * @returns {json} The response of generateToken function.
     */
    async getToken (req, res) {

        const data = req.body.data.name_guest;

        console.log(data);

        const user = {
            id: data.id_guest,
            name: data.name_guest,
            email: data.email_guest,
            host: data.host_guest
        }
        const meeting = {
            _id: data.id_meeting,
        }


        const newMeeting = await model.findOne({"_id": meeting._id});
        const meetingOfHost = await model.exists({"host_global_id.value": user.id})
        if( meetingOfHost!== null){
            user.host = true;
        }

        const token = generateToken(user, newMeeting);
        res.json({token});

    }
}
module.exports = TokenController;