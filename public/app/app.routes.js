angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		.when('/items', {
			templateUrl: 'app/views/pages/items/all.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		.when('/items/create', {
			templateUrl: 'app/views/pages/items/detail.html',
			controller: 'itemCreateController',
			controllerAs: 'item'
		})

		.when('/items/:item_id', {
			templateUrl: 'app/views/pages/items/detail.html',
			controller: 'itemEditController',
			controllerAs: 'item'
		});

	$locationProvider.html5Mode(true);

});