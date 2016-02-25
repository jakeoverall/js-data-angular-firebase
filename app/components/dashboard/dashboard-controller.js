app.controller('DashboardController', function($rootScope, $scope, User){
	
	$scope.updateMember = function(){
		User.update($rootScope.member.id, $rootScope.member);
	}
	
});