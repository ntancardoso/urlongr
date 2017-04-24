import './modal.html';

Template.newUrlModal.onRendered(function() {
    this.$('#newUrlModal').on('hidden.bs.modal', function() {
        console.log('closed');
        $('#newUrl').val('');
    });
});

Template.newUrlModal.events({
    'click #btn-copy' (event, tpl) {
        event.preventDefault();
        console.log('copy');
        $('#newUrl').select();
        document.execCommand('copy');
    }
});