app.service('testStepService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
	var testCaseServiceURL = AUTOMATION_CONSTANTS.TESTCASE_SERVICE;
	var actionsServiceURL = AUTOMATION_CONSTANTS.SCA_SERVICE+"/getActionsByApplication/";
	var machinesServiceURL = AUTOMATION_CONSTANTS.MACHINE_SERVICE;
	
	console.log('testStepService loaded');
	var testStepList = [];
	var actions = [];
	var machines = [];
	this.getTestStepList = function(testCaseID){
		  if(testCaseID === null || testCaseID === undefined){
			  return testStepList;
		  }
		  return  $http.get(testCaseServiceURL+"/getTestStepsByTestCase/"+$rootScope.applicationId+'/'+$rootScope.applicationName+"/"+testCaseID)
			.then(function(response) {
				console.log(response.status);
				if(response.data !== null && response.data !== undefined && response.data !== "") {
					testStepList = response.data;
				} else {
					testStepList = [];
				}
				return testStepList;
			});
	  };
	  
	  this.addTestStep = function(newObj,$scope, index) {
		  if(testStepList !== undefined) {
			  var len = newObj.length;
				for(var i = 0; i < len; i++){
					if(index !== undefined && index !== null && index !== "") {
						newObj[i].index = (testStepList[index].index + testStepList[index+1].index)/2;
						testStepList.splice(index+(i+1),0,newObj[i]);
					} else {
						testStepList.push(newObj[i]);
					}
				}			  
		  }
		  $http.post(testCaseServiceURL+'/addNewTestSteps/'+$rootScope.applicationId+'/'+$rootScope.applicationName, newObj).
		    success(function(data, status, headers, config) {
		    	//console.log("Success Add Test Step Data = " + data.testStepNumber);
		    	console.log("Success status = " + data);
		    	//newObj.testStepNumber = data.testStepNumber;
				var len = newObj.length;
				for(var i = 0; i < len; i++){
					newObj[i].testStepNumber = data[i].testStepNumber;
					if(index !== undefined && index !== null && index !== "") {
						$scope.data.splice(index+(i+1),0,newObj[i]);
					} else {
						$scope.data.push(newObj[i]);
					}
				}
				$rootScope.dispSuccessMsg("Test Step saved successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("add test step failed");
		    	$rootScope.dispErrorMsg("Test Step failed to save. Please try again");
		    });
	  };
	  
	  this.addUpdateTestSteps = function($scope,testStepsObj,testCaseId) {
			  $http.post(testCaseServiceURL+'/saveUpdateTestSteps/'+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+testCaseId, testStepsObj).
			    success(function(data, status, headers, config) {
			    	console.log("test steps add/updated successfully");
			    	$rootScope.dispSuccessMsg("Test Step updated successfully");
			    }).
			    error(function(data, status, headers, config) {
			    	console.log("test steps add/update failed");
			    	$rootScope.dispErrorMsg("Test Step failed to update. Please try again");
			    });
		};

	this.removeTestStep = function(testStep){				
		$http.post(testCaseServiceURL+'/deleteTestStep', testStep).
		    success(function(data, status, headers, config) {
		    	$rootScope.dispSuccessMsg("Test Step deleted successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	$rootScope.dispErrorMsg("Test Case failed to delete. Please try again");
		    });
	};

	this.updateTestStep = function(testStep){				
		  $http.post(testCaseServiceURL+'/updateTestStep', testStep).
		    success(function(data, status, headers, config) {
		    	$rootScope.dispSuccessMsg("Test Step updated successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	$rootScope.dispErrorMsg("Test Step failed to save. Please try again");
		    });
	  };
	  
  this.getTestStepLength = function(){
	  if(testStepList === undefined) {return 0;}
      return testStepList.length;
  };
  
  this.executeTest = function(execDetailObj){				
	  $http.post(testCaseServiceURL+'/executeTest',execDetailObj).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Test Case Execution triggered successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Test Case Execution failed to trigger. Please try again");
	    });
  };
  
  this.loadActions = function() {
	  return  $http.get(actionsServiceURL+$rootScope.applicationId+'/'+$rootScope.applicationName).then(function(response) {
			console.log("loadActions" + response.status);
			if(response.data !== undefined) {
				actions = response.data;
			} else {
				actions = [];
			}
		    return actions;
	     });
  };
  
  this.loadMachines = function() {
	  return  $http.get(machinesServiceURL+"/getMachinesByApplication/"+$rootScope.applicationId+'/'+$rootScope.applicationName).then(function(response) {
			console.log("loadMachines" + response.status);
			if(response.data !== undefined) {
				machines = response.data.machines;
				console.log("loadMachines data=" + machines);
			} else {
				machines = [];
			}
		    return machines;
	     });
  };

});
