app.service('testRunBuildService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testRunBuildService loaded');
var serviceURL = AUTOMATION_CONSTANTS.TESTRUN_SERVICE;
var testRunBuildList = [];

this.getTestRuns = function(){
	return testRunBuildList;
};


	this.getTestRunBuildList = function(){
	  return  $http.get(serviceURL+"/getTestRunBuilds/"+$rootScope.applicationId+'/'+$rootScope.applicationName)
		.then(function(response) {
			console.log(response.status);
			if(response.data.testRunBuilds !== undefined) {
				testRunBuildList = response.data.testRunBuilds;
			} else {
				testRunBuildList = [];
			}
			return testRunBuildList;
		});
  };

  this.addTestRunBuild = function(newObj, $scope) {
	  if(testRunBuildList !== undefined) {
	    testRunBuildList.push(newObj);
  	  }
	  $http.post(serviceURL+"/addNewTestRunBuild/"+$rootScope.applicationId+'/'+$rootScope.applicationName, newObj).
	    success(function(data, status, headers, config) {
	    	console.log("Success Add Test Run Build Data = " + data.testRunBuildId);
	    	console.log("Success status = " + data);
	    	newObj.testRunBuildId = data.testRunBuildId;
	    	$scope.trBuildData.push(newObj); 
	    	$rootScope.dispSuccessMsg("Test Run Build saved successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("Error Add Test Run Build Data ");
	    	$rootScope.dispErrorMsg("Test Run Build failed to save. Please try again");
	    });
  };
  
  this.removeTestRunBuild = function(testRunBuild){				
	  $http.post(serviceURL+"/deleteTestRunBuild/", testRunBuild).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Run Build deleted successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Run failed to delete. Please try again");
	    });
  };
  
  
  this.updateTestRunBuild = function(testRunBuild){				
	  $http.post(serviceURL+"/updateTestRunBuild/", testRunBuild).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Run Build updated successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Run Build failed to delete. Please try again");
	    });
  };

  this.getTestRunBuildLength = function(){
	  if(testRunBuildList === undefined) {return 0;}
      return testRunBuildList.length;
  };	

});