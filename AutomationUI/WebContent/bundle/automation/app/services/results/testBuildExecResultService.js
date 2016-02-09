app.service('testBuildExecResultService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testBuildExecResultService loaded');

var serviceURL = AUTOMATION_CONSTANTS.TESTBUILD_EXEC_SERVICE+"/getBuildExecutionResults/";
var testBuildExecResults = [];

this.getTestBuildExecResults = function(){
  return  $http.get(serviceURL+$rootScope.applicationId+'/'+$rootScope.applicationName)
	.then(function(response) {
		console.log("getTestBuildExecResults response status = " + response.status);
		if(response.data !== undefined) {
			testBuildExecResults = response.data;
		} else {
			testBuildExecResults = [];
		}
		return testBuildExecResults;
	});
};

});