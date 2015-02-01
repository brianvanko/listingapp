angular.module('itemService', [])

.factory('Item', function($http) {

	var itemFactory = {};

	itemFactory.get = function(id) {
		return $http.get('/api/items/' + id);
	};

	itemFactory.all = function() {
		return $http.get('/api/items/');
	};

	itemFactory.filterByCategory = function(category) {
		return $http.get('/api/category/' + category);
	};

	itemFactory.create = function(itemData) {
		return $http.post('/api/items/', itemData);
	};

	itemFactory.update = function(id, itemData) {
		return $http.put('/api/items/' + id, itemData);
	};

	itemFactory.delete = function(id) {
		return $http.delete('/api/items/' + id);
	};

	return itemFactory;

});