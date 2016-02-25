app.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/app/components/home/home.html',
				controller: 'HomeController'
			})
			.state('dashboard', {
				url: '/dashboard',
				controller: 'DashboardController',
				templateUrl: '/app/components/dashboard/dashboard.html'
			})
})

app.run(function ($rootScope, $state, AuthService) {
	$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
		var invalidUser = AuthService.authMember();
			if(invalidUser && toState.name.indexOf('auth') > -1){
				event.preventDefault();
				$state.go('home');
			}
	});
})