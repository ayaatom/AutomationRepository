app.controller('LoginCtrl', function($scope, $http, $location, loginService, $rootScope, appDetailsService,ngDialog,AUTOMATION_CONSTANTS) {
	$scope.errors = {login: ''};
	$scope.applications = [];
	$scope.selectedApplication = null;
	$scope.submitForm = function() {
		
		// check to make sure the form is completely valid
			//alert('our form is amazing');
			console.log($scope.username);
			console.log(AUTOMATION_CONSTANTS.LOGIN_SERVICE);
			$http.post(AUTOMATION_CONSTANTS.LOGIN_SERVICE+'/verifyUser', {
				"username":$scope.username,
				"password":$scope.password
				}).
		    success(function(data, status, headers, config) {
		    	console.log("header Authorization = "+headers('Authorization'));
		    	$rootScope.token = headers('Authorization');
		    	console.log("login status = "+status);
		    	console.log("login data = "+data);
		    	status = "SUCCESS";
		    	console.log("response token" + headers);
		    	$rootScope.userValid = true;
		    	$rootScope.username = $scope.username;
		    	//show application selection 
		    	//$location.path('/applicationDetails');
		    	$scope.applications = data;
		    	$scope.showApplicationPopup();
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("header Authorization = "+headers('Authorization'));
		    	console.log("login status = "+status);
		    	console.log("login data = "+data);
		    	status = "ERROR";
		    	$rootScope.token = '';
		    	$rootScope.userValid = false;
		    	
		    	 $scope.userForm.username.$setValidity("server", false);
		    	 $scope.userForm.password.$setValidity("server", false);
		    	$scope.errors.login = "User credentials invalid";
		    });
	};
	
	$scope.showApplicationPopup = function() {
		 $rootScope.clearMsgs();
		console.log("login controller showApplicationPopup. ");
		ngDialog.open({
			template : 'applicationDialog',
			controller : 'LoginCtrl',
			data: $scope.applications
		});
	};
	
	$scope.proceedLogin = function() {
		console.log("login controller proceedLogin. id = " + $scope.selectedApplication.id + ", name=" + $scope.selectedApplication.name);
		$rootScope.applicationId = $scope.selectedApplication.id;
		$rootScope.applicationName = $scope.selectedApplication.name;
		ngDialog.close();
		$location.path('/applicationDetails');
	};
	
	
});//End Login Ctrl