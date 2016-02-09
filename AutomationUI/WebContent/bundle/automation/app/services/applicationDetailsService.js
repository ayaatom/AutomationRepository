app.service('appDetailsService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('appDetailsService loaded');
var appDetails = [];
var serviceURL = AUTOMATION_CONSTANTS.APPDETAIL_SERVICE;
	this.loadAppDetails = function($scope,$rootScope){
	  $http.get(serviceURL+'/getApplicationDetailsByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName)
		.then(function(response) {
			console.log(response.status);
			if(response.data !== undefined) {
				$rootScope.appDetails = response.data;
			} else {
				$rootScope.appDetails = [];
			}
			$scope.entity =$rootScope.appDetails;
		});
  };

  this.submitAppDetails = function(appDetails,$scope) {
	  $http.post(serviceURL+'/submitApplicationDetails/'+$rootScope.applicationId+'/'+$rootScope.applicationName, appDetails).
	    success(function(data, status, headers, config) {
	    	console.log("Success submitted app details ");
	    	console.log("Success status = " + status);
	    	$rootScope.dispSuccessMsg("Application Details saved successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("Error submit app details = " + data);
	    	console.log("Error status = " + status);
	    	$rootScope.dispErrorMsg("Application Details failed to save. Please try again");
	    });
  };
  
});