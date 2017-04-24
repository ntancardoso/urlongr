import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Link, Links } from './links.js';

if (Meteor.isServer) {
    beforeEach(function() {
        Links.remove({});
        Links.insert({
            origUrl: 'https://www.google.com',
            domain: 'urlongr.com',
            path: generateString()
        });
    });
    describe('links collection', function() {
        it('insert correctly', function() {
            var link = new Link();
            link.origUrl = 'https://www.meteor.com';
            link.domain = 'urlongr.com';
            link.path = generateString();
            link.save();

            const added = Links.find({ _id: link._id });
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'links');
            assert.equal(count, 1);
        });
        it('update correctly', function() {
            var link = Link.findOne({ origUrl: 'https://www.google.com' });
            link.origUrl = 'https://www.meteor.com';
            link.save();

            const link2 = Link.findOne({ _id: link._id });
            assert.equal(link2.origUrl, 'https://www.meteor.com');
        });
        it('delete correctly', function() {
            var link = Link.findOne({ origUrl: 'https://www.google.com' });
            link.remove();

            const link2 = Link.findOne({ _id: link._id });
            assert.equal(link2, null);
        });
    });
}