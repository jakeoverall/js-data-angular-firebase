app.controller('DashboardController', function($rootScope, $scope, User, Models, authData){
	
	$scope.updateMember = function(){
		User.update(authData.uid, $rootScope.member);
	}
	
	$scope.addCustomer = function(){
		$scope.newCustomer.userId = $rootScope.member.id;
		Models.Customer.create($scope.newCustomer);
	}
	
	Models.Customer.findAll({}).then(function(){
		Models.Customer.bindAll({where: {userId: authData.uid}}, $scope, 'customers');
	})
	
	
});