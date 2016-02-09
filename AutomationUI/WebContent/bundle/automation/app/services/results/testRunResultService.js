app.service('testRunResultService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testRunResultService loaded');

var serviceURL = AUTOMATION_CONSTANTS.TESTBUILD_EXEC_SERVICE+"/getTestRunExecutionResults/";
var testRunResults = [];


this.getTestRunResults = function(executionId,buildId){
  return  $http.get(serviceURL+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+executionId+'/'+buildId)
	.then(function(response) {
		console.log("getTestRunResults response status = " + response.status);
		if(response.data !== undefined) {
			testRunResults = response.data;
		} else {
			testRunResults = [];
		}
		return testRunResults;
	});
};

});