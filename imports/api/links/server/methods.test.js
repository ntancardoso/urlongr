import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Link, Links } from '../links.js';
import './methods.js';


describe('links methods', function() {
    beforeEach(function() {
        Links.remove({});
    });

    it('can insert links', function() {
        var link = new Link();
        link.callMethod('urLongr', 'https://www.meteor.com');
        assert.equal(Links.find().count(), 1);
    });
});