app.service('testCaseResultService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testCaseResultService loaded');

var serviceURL = AUTOMATION_CONSTANTS.TESTCASE_SERVICE+"/getTestCaseResults/";
var testCaseResults = [];

this.getTestCaseResults = function(testCaseID){
  return  $http.get(serviceURL+$rootScope.applicationId+'/'+$rootScope.applicationName)
	.then(function(response) {
		console.log("getTestCaseResults response status = " + response.status);
		if(response.data !== undefined) {
			testCaseResults = response.data;
		} else {
			testCaseResults = [];
		}
		return testCaseResults;
	});
};

});