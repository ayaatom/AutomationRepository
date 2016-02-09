app.service('testRunBuildDetailService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
	var testRunBuildDetailServiceURL = AUTOMATION_CONSTANTS.TESTRUN_SERVICE;
	
	console.log('testRunBuildDetailService loaded');
	var testRunBuildDetail = [];
	
	this.getTestRunBuildDetail = function(testRunBuildID){
		  return  $http.get(testRunBuildDetailServiceURL+"/getTestRunBuildDetail/"+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+testRunBuildID)
			.then(function(response) {
				console.log(response.status);
				if(response.data !== undefined) {
					testRunBuildDetail = response.data;
				} else {
					testRunBuildDetail = [];
				}
				return testRunBuildDetail;
			});
	  };
	  
	  this.addTestRunBuildDetail = function(testRunBuildID, newObj, $scope) {
		  $http.post(testRunBuildDetailServiceURL+"/addNewTestRunBuildDetail/"+$rootScope.applicationId+'/'+$rootScope.applicationName+"/"+testRunBuildID, newObj).
		    success(function(data, status, headers, config) {
		    	console.log("test run build detail added successfully");
		    	newObj.testRunBuildDetailId = data.testRunBuildDetailId ;
		    	$scope.testRunBuildDetailObj.push(newObj);
		    	$rootScope.dispSuccessMsg("Test Run Build Detail saved successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("add test run build detail failed");
		    	$rootScope.dispErrorMsg("Test Run Build Detail failed to save. Please try again");
		    });
	  };
	  
	  this.updateTestRunBuildDetail = function(testRunBuildDetail){				
		  $http.post(testRunBuildDetailServiceURL + '/updateTestRunBuildDetail', testRunBuildDetail).
		    success(function(data, status, headers, config) {
		    	testRunBuildDetail.settingsTypeName = data.settingsTypeName;
		    	testRunBuildDetail.environmentCode = data.environmentCode;
		    	testRunBuildDetail.machineName = data.machineName;
		    	testRunBuildDetail.browserName = data.browserName;
		    	$rootScope.dispSuccessMsg("Test Run Build Detail updated successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	$rootScope.dispErrorMsg("Test Run Build Detail failed to update. Please try again");
		    });
	  };
	  
	this.removeTestRunBuildDetail = function(testRunBuildDetail){				
		$http.post(testRunBuildDetailServiceURL+"/deleteTestRunBuildDetail/"+$rootScope.applicationId+'/'+$rootScope.applicationName, testRunBuildDetail).
		    success(function(data, status, headers, config) {
		    	console.log("test run build detail removed successfully");
		    	$rootScope.dispSuccessMsg("Test Run Build Detail deleted successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("test run build detail remove failed");
		    	$rootScope.dispErrorMsg("Test Run Build Detail failed to delete. Please try again");
		    });
	};
	
	this.executeTestRunBuild = function(execDetails){				
		$http.post(testRunBuildDetailServiceURL+'/executeTestRunBuild',execDetails).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Run Build Execution triggered successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Run Build Execution failed to trigger. Please try again");
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
	  if(testRunBuildDetail === undefined) {return 0;}
	  return testRunBuildDetail.length;
  };
  

});
