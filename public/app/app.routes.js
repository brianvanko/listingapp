angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		//default product page index
		.when('/', {
			templateUrl: 'app/views/pages/items/products.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		//single item route
		.when('/items/:item_id', {
			templateUrl: 'app/views/pages/items/details.html',
			controller: 'itemViewController',
			controllerAs: 'item'
		})

		//dashboard route
		.when('/admin/items', {
			templateUrl: 'app/views/pages/items/dashboard.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		//create an item route
		.when('/admin/items/create', {
			templateUrl: 'app/views/pages/items/edit.html',
			controller: 'itemCreateController',
			controllerAs: 'item'
		})

		//edit an individual item
		.when('/admin/items/edit/:item_id', {
			templateUrl: 'app/views/pages/items/edit.html',
			controller: 'itemEditController',
			controllerAs: 'item'
		})

		//categories route
		.when('/category/:category', {
			templateUrl: 'app/views/pages/items/products.html',
			controller: 'itemController',
			controllerAs: 'item'
		})

		// USER ROUTES //

		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    		controllerAs: 'login'
		})

		// sign up form
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/profile.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit user info
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/profile.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		// show all users
		.when('/admin/users', {
			templateUrl: 'app/views/pages/users/users.html',
			controller: 'userController',
			controllerAs: 'user'
		});

	$locationProvider.html5Mode(true);

});