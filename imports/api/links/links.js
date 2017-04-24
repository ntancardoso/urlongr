import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Links = new Mongo.Collection('links');

export const AccessLog = Class.create({
    name: 'AccessLog',
    fields: {
        ip: {
            type: String,
            optional: true
        },
        country: {
            type: String,
            optional: true
        },
        os: {
            type: String,
            optional: true
        },
        osVersion: {
            type: String,
            optional: true
        },
        browser: {
            type: String,
            optional: true
        },
        browserVersion: {
            type: String,
            optional: true
        },
        device: {
            type: String,
            optional: true
        },
        deviceType: {
            type: String,
            optional: true
        },
        deviceVendor: {
            type: String,
            optional: true
        },
        engine: {
            type: String,
            optional: true
        },
        engineVersion: {
            type: String,
            optional: true
        },
        cpu: {
            type: String,
            optional: true
        },
        referer: {
            type: String,
            optional: true
        },
        rawHeaders: String,
        createdAt: {
            type: Date,
            optional: true
        },
    },
    events: {
        beforeInsert(e) {
            e.currentTarget.createdAt = new Date();
        },
    }
});

export const Link = Class.create({
    name: 'Link',
    collection: Links,
    fields: {
        origUrl: String,
        subdomain: {
            type: String,
            optional: true
        },
        domain: String,
        path: String,
        message: {
            type: String,
            optional: true
        },
        stats: {
            type: [AccessLog],
            optional: true
        },
        createdBy: {
            type: String,
            default: 'guest'
        },
        modifiedBy: {
            type: String,
            optional: true
        },
        createdAt: {
            type: Date,
            optional: true
        },
        modifiedAt: {
            type: Date,
            optional: true
        },
        deletedAt: {
            type: Date,
            optional: true
        },
        ative: {
            type: Boolean,
            default: true
        }
    },
    events: {
        beforeInsert(e) {
            e.currentTarget.createdAt = new Date();
        },
        beforeUpdate(e) {
            e.currentTarget.modifiedAt = new Date();
        }
    },
    validators: {
        origUrl: [{
            type: 'minLength',
            param: 3
        }]
    },
    helpers: {
        longUrl() {
            return 'http://' + (this.subdomain ? this.subdomain + '.' : '') + this.domain + (this.path ? '/' + this.path : '');
        },
        getOrigUrl() {
            return this.origUrl.startsWith('http') ? this.origUrl : 'http://' + this.origUrl;
        }
    }
});