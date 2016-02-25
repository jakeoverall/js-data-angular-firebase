app.controller('AppController', function ($scope, $state) {
	console.log('App Controller');
	$scope.onauthCallback = function (error, memberData) {
		if (error) {
			//CUSTOM ERROR HANDLER
			return console.log(error);
		}
		console.log(memberData);
		$state.go('dashboard');
	};


	$scope.unauthCallback = function () {
		$state.go('home');
	}

})