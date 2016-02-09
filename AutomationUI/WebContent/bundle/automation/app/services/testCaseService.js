app.service('testCaseService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testCaseService loaded');
var serviceURL = AUTOMATION_CONSTANTS.TESTCASE_SERVICE;
var testCaseList = [];

this.getTestCases = function(){
	return testCaseList;
};


	this.getTestCaseList = function(){
	  return  $http.get(serviceURL+"/getTestCasesByApplication/",{params : {
		    applicationId : $rootScope.applicationId
		        ,applicationName : $rootScope.applicationName
		      }})
		.then(function(response) {
			console.log(response.status);
			//console.log(JSON.parse(response.data.testSteps));
			if(response.data.testCases !== undefined) {
//				testCaseList = JSON.parse(response.data.testCases);
				testCaseList = response.data.testCases;
			} else {
				testCaseList = [];
			}
			return testCaseList;
		});
  };

  this.addTestCase = function(newObj,$scope) {
	  if(testCaseList !== undefined) {
	    testCaseList.push(newObj);
  	  }
	  $http.post(serviceURL+'/addNewTestCase', newObj).
	    success(function(data, status, headers, config) {
	    	console.log("Success Add Test Case Data = " + data.testCaseId);
	    	console.log("Success status = " + data);
	    	newObj.testCaseId = data.testCaseId;
			$scope.data.push(newObj); 
			$rootScope.dispSuccessMsg("Test Case saved successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("Error Add Test Case Data = " + data.testCaseId);
	    	console.log("Error status = " + data);
	    	$rootScope.dispErrorMsg("Test Case failed to save. Please try again");
	    });
  };
  
  this.removeTestCase = function(testCase){				
	  $http.post(serviceURL+'/deleteTestCase', testCase).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Case deleted successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Case failed to delete. Please try again");
	    });
  };
  
  
  this.updateTestCase = function(testCase){				
	  $http.post(serviceURL+'/updateTestCase', testCase).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Case updated successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Case failed to update. Please try again");
	    });
  };

  this.getTestCaseLength = function(){
	  if(testCaseList === undefined) {return 0;}
      return testCaseList.length;
  };	

});