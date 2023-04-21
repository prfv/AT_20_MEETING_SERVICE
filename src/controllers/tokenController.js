/**
*@interview_route.js
*Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
*Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
*All rights reserved
*This software is the confidential and proprietary information of
*Jalasoft, Confidential Information You shall not
*disclose such Confidential Information and shall use it only in
*accordance with the terms of the license agreement you entered into
*with Jalasoft
**/
const generateToken = require('../models/generateToken');

class TokenController{
    getToken (req, res) {
        const data = req.body;
        // const token = generateToken('1234', 'Gio Perez', 'gio@gmail.com', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'guest', 'at20ReuMeeting');
        const token = generateToken(data.id, data.name, data.email, data.image, data.role, data.roomName);
        res.json({Token: token});
    }
    //Get an Interview by Id from mongo db
    getInterviewById = async (req, res) => {
        const data = req.params.id;
        const interview = await model.findOne({"id": data});
        if (!interview) {
            res.status(404).json({ message: 'Interview not found' });
        } else {
            res.json(interview);
        }
    }
}
module.exports = TokenController;