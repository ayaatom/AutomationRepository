app.service('testCaseResultService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('testCaseResultService loaded');

var serviceURL = AUTOMATION_CONSTANTS.TESTCASE_SERVICE+"/getTestStepResults/";
var testCaseResults = [];

this.getTestCaseResults = function(){
	return testCaseResults;
};


this.getTestCaseResults = function(testCaseID){
  return  $http.get(serviceURL,{params : {
	    	 applicationId : $rootScope.applicationId
	        ,applicationName : $rootScope.applicationName
	        ,testCaseId : testCaseID	
	      }})
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

  

  this.getTestCaseResultsLength = function(){
	  if(testCaseResults === undefined) {return 0;}
      return testCaseResults.length;
  };	

});