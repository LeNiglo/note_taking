var basicAuth = new HttpBasicAuth("leniglo", "crazyGecko");
basicAuth.protect();

var modules = [
{
	name: "Advanced Java",
	code: "CO871",
	color: "#E60000"
},
{
	name: "Cloud Computing",
	code: "CO846",
	color: "#33CC33"
},
{
	name: "Internet of Things",
	code: "CO838",
	color: "#D0D074"
},
{
	name: "Management of Operations",
	code: "CB932",
	color: "#CC00FF"
},
{
	name: "New Enterprise Development",
	code: "CO845",
	color: "#3399FF"
},
{
	name: "Computing Law",
	code: "CO841",
	color: "#B2B2CC"
},
{
	name: "Project Research",
	code: "CO885",
	color: "#FF9933"
},
{
	name: "Master Project",
	code: "CO880",
	color: "#996633"
},

]

Meteor.startup(function () {

	if (Module.find().count() < modules.length) {
		Module.remove();

		modules.forEach(function (e, i) {
			Module.insert({
				name: e.name,
				code: e.code,
				color: e.color,
				content: "",
				order: i
			});
		});

	}


});
