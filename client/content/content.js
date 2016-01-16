var lastKeyUp = null;

Template.content.events({
	'keyup .content': function (e) {

		var $this = $(e.currentTarget);

		var newKeyUp = new Date();

		if (newKeyUp - lastKeyUp < 1500) {
			clearTimeout(timeoutKeyUp.get());
			timeoutKeyUp.set(null);
		}

		timeoutKeyUp.set(Meteor.setTimeout(function () {
			saveContent($this.data('id'));
		}, 1500));


		lastKeyUp = newKeyUp;

	}
})
