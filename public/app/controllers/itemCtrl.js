angular.module("itemCtrl", ['itemService'])

.controller("itemController", function(Item) {

	var vm = this;
	
	Item.all()
		.success(function(data) {
			console.log('success')
			vm.items = data;
		});

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

