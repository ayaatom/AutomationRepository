app.service('testStepResultService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testStepResultService loaded');

var serviceURL = AUTOMATION_CONSTANTS.TESTCASE_SERVICE+"/getTestStepResults/";
var testStepResultServiceURL = AUTOMATION_CONSTANTS.TESTBUILD_EXEC_SERVICE;
var buildServiceURL = AUTOMATION_CONSTANTS.TESTBUILD_EXEC_SERVICE+"/getTestStepExecutionResults";
var testStepResults = [];


this.getTestStepLastExecutionResults = function(testCaseID){
  return  $http.get(serviceURL,{params : {
	    	 applicationId : $rootScope.applicationId
	        ,applicationName : $rootScope.applicationName
	        ,testCaseId : testCaseID	
	      }})
	.then(function(response) {
		console.log("getTestStepLastExecutionResults response status = " + response.status);
		if(response.data !== undefined) {
			testStepResults = response.data;
		} else {
			testStepResults = [];
		}
		return testStepResults;
	});
};

this.getTestStepBuildResults = function(executionId, buildId,testRunId,testRunIteration, testCaseId,iteration){
	var url = "";
	if(testRunIteration != null && iteration != null){
		url = testStepResultServiceURL+"/getIterationTestStepIterationExecutionResults/"+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+executionId+'/'+buildId+"/"+testRunId+"/"+testRunIteration +"/"+testCaseId + "/" +iteration;
	} else if(testRunIteration == null && iteration != null) {
		url = testStepResultServiceURL+"/getTestStepIterationExecutionResults/"+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+executionId+'/'+buildId+"/"+testRunId +"/"+testCaseId + "/" +iteration;
	} else if(testRunIteration != null && iteration == null) {
		url = testStepResultServiceURL+"/getIterationTestStepExecutionResults/"+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+executionId+'/'+buildId+"/"+testRunId+"/"+testRunIteration +"/"+testCaseId;
	} else {
		url = testStepResultServiceURL+"/getTestStepExecutionResults/"+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+executionId+'/'+buildId+"/"+testRunId+"/"+testCaseId
	}
	
	return  $http.get(url)
		.then(function(response) {
			console.log("getTestStepBuildResults response status = " + response.status);
			if(response.data !== undefined) {
				testStepResults = response.data;
			} else {
				testStepResults = [];
			}
			return testStepResults;
		});
	};

});