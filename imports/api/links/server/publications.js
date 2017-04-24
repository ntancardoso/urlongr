import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Links } from '../links.js';

Meteor.publish('link.all', function linksAll() {
    return Links.find();
});

Meteor.publish('link.byid', function linkById(id) {
    console.log(id);
    check(id, String);
    return Links.find({ _id: id });
});