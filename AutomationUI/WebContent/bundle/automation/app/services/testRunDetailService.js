app.service('testRunDetailService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
	var testRunDetailServiceURL = AUTOMATION_CONSTANTS.TESTRUN_SERVICE;
	
	console.log('testStepService loaded');
	var testRunDetail = [];
	
	this.getTestRunDetail = function(testRunID){
		  if(testRunID === null || testRunID === undefined){
			  return testRunDetail;
		  }
		  return  $http.get(testRunDetailServiceURL+"/getTestRunDetailByTestRun/"+$rootScope.applicationId+'/'+$rootScope.applicationName+"/"+testRunID)
			.then(function(response) {
				console.log(response.status);
				if(response.data !== null && response.data !== undefined && response.data !== "") {
					testRunDetail = response.data;
				} else {
					testRunDetail = [];
				}
				return testRunDetail;
			});
	  };
	  
	  this.addTestRunDetail = function(newObj, $scope) {
		  $http.post(testRunDetailServiceURL+"/addNewTestRunDetail/"+$rootScope.applicationId+'/'+$rootScope.applicationName+"/", newObj).
		    success(function(data, status, headers, config) {
		    	console.log("test run detail added successfully");
		    	newObj.testRunDetailId = data.testRunDetailId ;
		    	$scope.testRunDetailObj.push(newObj); 
		    	$rootScope.dispSuccessMsg("Test Run Detail saved successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("add test run detail failed");
		    	$rootScope.dispErrorMsg("Test Run Detail failed to save. Please try again");
		    });
	  };
	  
	  this.updateTestRunDetail = function(testRunDetail){				
		  $http.post(testRunDetailServiceURL + '/updateTestRunDetail', testRunDetail).
		    success(function(data, status, headers, config) {
		    	$rootScope.dispSuccessMsg("Test Run Detail updated successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	$rootScope.dispErrorMsg("Test Run Detail failed to update. Please try again");
		    });
	  };
	  
	this.removeTestRunDetail = function(testRunDetail, $scope, $index){				
		$http.post(testRunDetailServiceURL+"/deleteTestRunDetail/"+$rootScope.applicationId+'/'+$rootScope.applicationName+"/", testRunDetail).
		    success(function(data, status, headers, config) {
		    	$scope.testRunDetailObj.splice($index, 1);
		    	console.log("test run detail removed successfully");
		    	$rootScope.dispSuccessMsg("Test Run Detail deleted successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("test run detail remove failed");
		    	$rootScope.dispErrorMsg("Test Run Detail failed to delete. Please try again");
		    });
	};
	
	this.executeTestRun = function(execDetailObj){				
		$http.post(testRunDetailServiceURL+'/executeTestRun',execDetailObj).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Run Execution triggered successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Run Execution failed to trigger. Please try again");
	    });
	  };

  
  this.loadActions = function() {
	  return  $http.get(actionsServiceURL,{params : {
	    	applicationId : $rootScope.applicationId
	        ,applicationName : $rootScope.applicationName
	      }}).then(function(response) {
			console.log("loadActions" + response.status);
			if(response.data !== undefined) {
				actions = response.data;
			} else {
				actions = [];
			}
		    return actions;
	     });
  };

  this.getTestRunDetailLength = function() {
	  if(testRunDetail === undefined) {return 0;}
	  return testRunDetail.length;
  };
  
  this.saveUpdateTestRunDetails = function($scope,testRunDetailsObj,testRunId) {
	  $http.post(testRunDetailServiceURL+'/saveUpdateTestRunDetail/'+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+testRunId, testRunDetailsObj).
	    success(function(data, status, headers, config) {
	    	console.log("test run detail add/updated successfully");
	    	$rootScope.dispSuccessMsg("Test Run details saved successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("test run detail add/update failed");
	    	$rootScope.dispErrorMsg("Test Run details failed to save. Please try again");
	    });
};
});
