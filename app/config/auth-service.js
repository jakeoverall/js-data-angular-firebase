app.factory('User', function(DS){
    return DS.defineResource('user');
});

app.factory('AuthService', function($rootScope, DSFirebaseAdapter, User){
    var db = DSFirebaseAdapter.ref;
    
	function authMember(cb) {
		var authData = db.getAuth();
		if (!authData) {
			cb ? cb({ error: { message: 'Unable to Authenticate' } }) : '';
			return true;
		} 
        setMember(authData.uid, cb);
	}

	function setMember(id, cb) {
        User.bindOne(id, $rootScope, 'member');	 
		cb? cb() : '';
	}
	
	function createUser(authData, user){
		var userToAdd = {
                id: authData.uid,
				email: user.email,
				created: Date.now()
			}
            User.create(userToAdd);
	}
    
    this.register = function (user, cb) {
		db.createUser(user, function (err, authData) {
			if (err) {
				return cb(err)
			}
			createUser(authData, user);
			authMember(cb);
		});
	}

	this.login = function (user, cb) {
		db.authWithPassword(user, function (err, authData) {
			if (err) {
				return cb(err)
			}
			authMember(cb);
		})
	}

	this.logout = function(){
		db.unauth();
		$rootScope.member = null;
	}
})