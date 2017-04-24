import { Meteor } from 'meteor/meteor';
import { Link } from '/imports/api/links/links.js';

import './longify.html';


Template.longify.onRendered(function() {
    this.$('input[name="origurl"]').focus();
});


Template.longify.events({
    'submit .longify' (event, tpl) {
        event.preventDefault();

        const target = event.target;
        const origurl = target.origurl.value;

        var link = new Link();
        link.applyMethod('urLongr', [origurl], (error, result) => {
            if (error) {
                console.log(error);
                console.log(error.message);
            }
            if (result) {
                $('#newUrl').val(result.longUrl());
                $('#newUrlModal').modal('show');
            }
            target.origurl.value = '';
        });


    },
});