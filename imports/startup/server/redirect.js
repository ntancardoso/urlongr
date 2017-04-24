import { Meteor } from 'meteor/meteor';
import { Link, AccessLog } from '/imports/api/links/links.js';
import parser from 'ua-parser-js';

WebApp.connectHandlers.use((req, res, next) => {

    var urlPath = req.originalUrl;

    if (urlPath != '/') {
        const link = Link.findOne({ path: urlPath.substring(1), $or: [{ deletedAt: { $exists: false } }, { deletedAt: { $gt: new Date() } }] }, {
            children: false
        });

        if (link && link.origUrl) {

            //var parser = new UAParser();
            var ua = parser(req.headers['user-agent']);
            const accessLog = new AccessLog({
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                country: '',
                os: ua.os.name,
                osVersion: ua.os.version,
                browser: ua.browser.name,
                browserVersion: ua.browser.version,
                device: ua.device.model,
                deviceType: ua.device.type,
                deviceVendor: ua.device.vendor,
                engine: ua.engine.name,
                engineVersion: ua.engine.version,
                cpu: ua.cpu.architecture,
                referer: req.headers.referer,
                rawHeaders: JSON.stringify(req.headers)
            });
            link.stats.push(accessLog);
            link.save();
            res.writeHead(301, { Location: link.getOrigUrl() });
            res.end();
            return;
        }
    }
    next();



});