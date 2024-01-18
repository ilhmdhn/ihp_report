const { raw } = require('body-parser');
const ReportTable = require('../model/report');
const response = require('../tools/response');

const insertReport = async(req, res)=>{
    try {

        const outlet = req.body.outlet;
        const apps = req.body.apps;
        const version = req.body.version;
        const detail = req.body.detail;

        const searchDate = moment(new Date()).format('YYYY-MM-DD');

        const alreadyInsert = await ReportTable.findOne({
            where: {
                outlet: outlet,
                apps: apps,
                version: version,
                detail: detail,
                time: searchDate
            },
            raw: true
        });

        if(!alreadyInsert){
            await ReportTable.create({
                outlet: outlet,
                apps: apps,
                version: version,
                detail: detail
            });
        }
        res.send(response(true, 'SUCCESS'));
    } catch (err) {
        console.log(`
            Error insert
            name: ${err.name}
            message: ${err.message}
            stack: ${err.stack}
        `)
        res.status(500).send(response(false, err.name));
    }
}