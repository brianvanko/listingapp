angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/products.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		.when('/category/:category', {
			templateUrl: 'app/views/pages/products.html',
			controller: 'itemCategory',
			controllerAs: 'item'
		})

		.when('/items', {
			templateUrl: 'app/views/pages/items/dashboard.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		.when('/items/create', {
			templateUrl: 'app/views/pages/items/edit.html',
			controller: 'itemCreateController',
			controllerAs: 'item'
		})

		.when('/items/:item_id', {
			templateUrl: 'app/views/pages/items/edit.html',
			controller: 'itemEditController',
			controllerAs: 'item'
		});

	$locationProvider.html5Mode(true);

});