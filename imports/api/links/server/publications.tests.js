// Tests for the links publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'meteor/practicalmeteor:chai';
import { Links } from '../links.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';

describe('links publications', function() {
    beforeEach(function() {
        Links.remove({});
        Links.insert({
            origUrl: 'https://www.meteor.com',
        });
    });

    describe('link.all', function() {
        it('sends all links', function(done) {
            const collector = new PublicationCollector();
            collector.collect('link.all', (collections) => {
                assert.equal(collections.links.length, 1);
                done();
            });
        });
    });
});