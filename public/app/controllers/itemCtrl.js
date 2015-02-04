angular.module("itemCtrl", ['itemService'])

.controller("itemController", function(Item, $routeParams, $rootScope, $location, Auth) {
	console.log('-----------ITEM MAIN', $routeParams.category)

	var vm = this;

	/////////////// LOGIN LOGIC, MUST BE REFACTORED ///////////////
	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	

		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	vm.doLogin = function() {
		vm.processing = true;

		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				if (data.success)			
					$location.path('/');
				else 
					vm.error = data.message;
				
			});
	};

	vm.doLogout = function() {
		Auth.logout();
		window.location.reload();
	};

	/////////////// END LOGIN LOGIC ///////////////

	vm.filterData = function(searchReq) {
		console.log('searchReq: ' + searchReq);
		vm.searchText = searchReq;
	}
	
	vm.deleteItem = function(id) {
		console.log('deleting')

		Item.delete(id)
			.success(function(data) {
				Item.all()
					.success(function(data) {
						vm.items = data;
					});

		});
	};

	if ( vm.items ) { return };
	Item.all()
			.success(function(data) {
				console.log('success all')
				vm.items = data;
			});

	
})

.controller("itemCategoryController", function(Item, $routeParams) {
	console.log('-----------ITEM CATEGORY', $routeParams.category)

	var vm = this;

	Item.filterByCategory($routeParams.category)
			.success(function(data) {
				console.log('success category controller')
				vm.items = data;
			});
})

.controller('itemViewController', function($routeParams, Item) {
	var vm = this;

	Item.get($routeParams.item_id)
		.success(function(data) {
			vm.itemData = data;
		});
})

.controller('itemEditController', function($routeParams, Item) {

	var vm = this;
	vm.type = 'edit';

	Item.get($routeParams.item_id)
		.success(function(data) {
			vm.itemData = data;
		});

	vm.saveItem = function() {
		vm.message = '';

		Item.update($routeParams.item_id, vm.itemData)
			.success(function(data) {
				vm.itemData = {};
				vm.message = data.msg;
			});
	};

})

.controller('itemCreateController', function(Item){

	var vm = this;
	vm.type = 'create';

	vm.saveItem = function() {
		Item.create(vm.itemData)
			.success(function(data) {
				vm.itemData = {};
				vm.message = data.msg;
			})
	}
})

