app.service('testRunDetailResultService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testRunDetailResultService loaded');

var serviceURL = AUTOMATION_CONSTANTS.TESTBUILD_EXEC_SERVICE+"/getTestRunDetailExecutionResults/";
var testRunDetailResults = [];

this.getTestRunDetailResults = function(executionId,buildId, testRunId){
  return  $http.get(serviceURL+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+executionId+'/'+buildId+"/"+testRunId)
	.then(function(response) {
		console.log("getTestRunDetailResults response status = " + response.status);
		if(response.data !== undefined) {
			testRunDetailResults = response.data;
		} else {
			testRunDetailResults = [];
		}
		return testRunDetailResults;
	});
};
	

this.getTestRunDetailIterationResults = function(executionId,buildId, testRunId, iteration){
	  return  $http.get(serviceURL+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+executionId+'/'+buildId+"/"+testRunId + "/" + iteration)
		.then(function(response) {
			console.log("getTestRunDetailResults response status = " + response.status);
			if(response.data !== undefined) {
				testRunDetailResults = response.data;
			} else {
				testRunDetailResults = [];
			}
			return testRunDetailResults;
		});
	};
	

});