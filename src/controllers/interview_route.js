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
const model = require('../models/interview_route');

class InterviewController {
    //Create an interview and insert in mongo db
    insertInterview(req, res) {
        const interview = req.body
        try {
            interview.host_global_id = interview.host_global_id.map(
                (host) => {
                    return {
                        value: host.value,
                        name: host.name,
                    };
                }
            )

            interview.guest_global_id = interview.guest_global_id.map(
                (guest) => {
                    return {
                        value: guest.value,
                        name: guest.name,
                    };
                }
            )

            console.log(interview);
            model.create(interview);
            res.send(interview);
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Server error: ' + error,
                error: error
            });
        };
    }

    //Get all Interviews from mongo db
    getAllInterviews = async (req, res) => {
        const interviews = await model.find();
        res.json(interviews);
    };

    //Get an Interview by Id from mongo db
    getInterviewById = async (req, res) => {
        const data = req.params.id;
        console.log(req.params);
        const interview = await model.findOne({ "_id": data });
        if (!interview) {
            res.status(404).json({ message: 'Interview not found' });
        } else {
            const interview2 = interview.toObject();

            interview2.date = new Date(interview2.date).toISOString().split('T')[0];

            const start_time_unformatted = new Date(interview2.start_time).toISOString().split('T')[1].split('.')[0];
            const timeString = start_time_unformatted
            const dateObj = new Date(`2022-01-01T${timeString}`);
            interview2.start_time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            const end_time_unformatted = new Date(interview2.end_time).toISOString().split('T')[1].split('.')[0];
            const timeString2 = end_time_unformatted;
            const dateObj2 = new Date(`2022-01-01T${timeString2}`);
            interview2.end_time = dateObj2.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });


            console.log(interview2);
            res.json(interview2);



        }
    }

    //Update an Interview by Id
    updateInterview = async (req, res) => {
        const id = req.params;
        const interview = await model.findOneAndUpdate(id, req.body)
        if (!interview) {
            res.status(404).json({ message: 'interview not found' });
        } else {
            res.send(`Interview was updated successfully`);
        }
    }

    //Delete an Interview by Id from mongo db
    deleteInterviewById = async (req, res) => {
        const id = req.params;
        const interview = await model.findOneAndDelete(id)
        if (!interview) {
            res.status(404).json({ message: 'Interview not found' });
        } else {
            res.send(`Interview was delete successfully`);
        }
    }


    getMyInterviews = async (req, res) => {
        const id = req.query.id;
        console.log(id);
        let interviews = await model.find({ "host_global_id.value": id });
        if (interviews.length == 0)
            interviews = await model.find({ "guest_global_id.value": id });

        if (!interviews) {
            res.status(404).json({ message: 'Interview not found' });
        } else {
            res.json(interviews);
        }
    }
}

module.exports = InterviewController;