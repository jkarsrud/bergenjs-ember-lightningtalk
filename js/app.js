var App = Ember.Application.create();

App.Router.map(function() {
	this.route('contributors');
	this.route('contributor', {path: 'contributors/:contributor_id'});
});

App.ApplicationController = Ember.Controller.extend({
	meetup: "BergenJS"
});

App.IndexRoute = Ember.Route.extend({
	setupController: function(controller) {
		controller.set('title', 'Hello from the Index controller');
	}
});

App.ContributorsRoute = Ember.Route.extend({
	model: function() {
		return App.Contributor.all();
	}
});

App.Contributor = Ember.Object.extend();

App.Contributor.reopenClass({
	allContributors: [],
	all: function() {
		this.allContributors = [];
		var url = 'https://api.github.com/repos/component/component/contributors';
		$.ajax({
			url: url,
			dataType: 'jsonp',
			context: this
		}).success(function(resp) {
			resp.data.forEach(function(contributor) {
				this.allContributors.addObject(App.Contributor.create(contributor));
			}, this);
		});
		return this.allContributors;
	}
});
