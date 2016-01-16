summernoteLoading = new ReactiveVar(true);
timeoutKeyUp = new ReactiveVar(null);
isSaving = new ReactiveVar(false);

subscriptionComplete = Meteor.subscribe("modules", {
	onReady: function () {
		console.log("sub ready");
		initSummerNote();
	},
	onChanged: function () {
		console.log("sub changed");
		initSummerNote();
	},
	onError: function () {
		console.log("sub error");
	}
});

Template.tabs.helpers({
	module: function () {
		return Module.find({}, {sort: {order: 1}});
	},
	message: function () {
		if (subscriptionComplete.ready() != true) {
			return "Loading ...";
		} else if (summernoteLoading.get() == true) {
			return "Waiting ...";
		} else if (isSaving.get() != false) {
			return "Saving ...";
		} else if (timeoutKeyUp.get() != null) {
			return "Typing ...";
		} else {
			return "OK.";
		}
	}
});

Template.tabs.events({
	'hide.bs.tab a[data-toggle="tab"]': function (e) {
		return saveContent($(e.target).data('id'));
	}
});


Template.tabs.rendered = function() {

	Tracker.autorun(function(){
		subscriptionComplete.ready();
		initSummerNote();
	});

	$(document).keydown(function(event) {
		if((event.ctrlKey || event.metaKey) && event.which == 83) {
			saveContent();
			event.preventDefault();
			return false;
		};
	});
}

