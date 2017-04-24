import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

import { Link } from '../links.js';

export const DEFAULT_URL_LENGTH = Meteor.settings.DEFAULT_URL_LENGTH || 4000;
export const DEFAULT_DOMAIN = Meteor.settings.DEFAULT_DOMAIN || 'urlongr.com';

Link.extend({
    meteorMethods: {
        urLongr(origUrl) {
            check(origUrl, String);
            var link = Link.findOne({ origUrl: origUrl, $or: [{ deletedAt: { $exists: false } }, { deletedAt: { $gt: new Date() } }] });

            if (!link) {
                link = new Link();
                link.origUrl = origUrl;
                link.path = generateString();
                link.domain = DEFAULT_DOMAIN //TOOD support other domains
                link.save();
            }

            return link;
        }
    }
});


generateString = function(size = DEFAULT_URL_LENGTH) {
    return Random.id(size);
}