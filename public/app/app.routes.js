angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		//default product page index
		.when('/', {
			templateUrl: 'app/views/pages/items/products.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		//create an item route
		.when('/items/create', {
			templateUrl: 'app/views/pages/items/edit.html',
			controller: 'itemCreateController',
			controllerAs: 'item'
		})

		//edit an individual item
		.when('/items/edit/:item_id', {
			templateUrl: 'app/views/pages/items/edit.html',
			controller: 'itemEditController',
			controllerAs: 'item'
		})

		//categories route
		.when('/category/:category', {
			templateUrl: 'app/views/pages/items/products.html',
			controller: 'itemCategoryController',
			controllerAs: 'item'
		})

		//single item route
		.when('/items/:item_id', {
			templateUrl: 'app/views/pages/items/details.html',
			controller: 'itemViewController',
			controllerAs: 'item'
		})

		//dashboard route
		.when('/items', {
			templateUrl: 'app/views/pages/items/dashboard.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

	$locationProvider.html5Mode(true);

});