Meteor.publish("modules", function () {
	return Module.find();
});

Meteor.methods({

	update: function (code, content) {
		Module.update(
			{_id: code},
			{$set: {content: content}},
			function (err, res) {
				if (err) {
					throw new Meteor.Error("update-error", "Error while updating.");
				}
				return true;
			});
		return true;
	}

})
