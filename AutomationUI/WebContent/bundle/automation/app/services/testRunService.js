app.service('testRunService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testRunService loaded');
var serviceURL = AUTOMATION_CONSTANTS.TESTRUN_SERVICE;
var testRunList = [];

this.getTestRuns = function(){
	return testRunList;
};


	this.getTestRunList = function(){
	  return  $http.get(serviceURL+"/getTestRunsByApplication/",{params : {
		    applicationId : $rootScope.applicationId
		        ,applicationName : $rootScope.applicationName
		      }})
		.then(function(response) {
			console.log(response.status);
			if(response.data.testRuns !== undefined) {
				testRunList = response.data.testRuns;
			} else {
				testRunList = [];
			}
			return testRunList;
		});
  };

  this.addTestRun = function(newObj, $scope) {
	  if(testRunList !== undefined) {
	    testRunList.push(newObj);
  	  }
	  $http.post(serviceURL+"/addNewTestRun/", newObj).
	    success(function(data, status, headers, config) {
	    	console.log("Success Add Test Run Data = " + data.testRunId);
	    	console.log("Success status = " + data);
	    	newObj.testRunId = data.testRunId;
	    	$scope.data.push(newObj); 
	    	$rootScope.dispSuccessMsg("Test Run saved successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("Error Add Test Run Data ");
	    	$rootScope.dispErrorMsg("Test Run failed to save. Please try again");
	    });
  };
  
  this.removeTestRun = function(testRun){				
	  $http.post(serviceURL+"/deleteTestRun/", testRun).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Run deleted successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Run failed to delete. Please try again");
	    });
  };
  
  
  this.updateTestRun = function(testRun){				
	  $http.post(serviceURL+"/updateTestRun/", testRun).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Run updated successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Run failed to delete. Please try again");
	    });
  };

  this.getTestRunLength = function(){
	  if(testRunList === undefined) {return 0;}
      return testRunList.length;
  };	

});