app.controller('TestCaseResultCtrl', function($scope, testCaseResultService, $routeParams,AUTOMATION_CONSTANTS) {

$scope.data = [];
var tcResultLoaded = false;
$scope.testCaseID = $routeParams.testCaseID;
$scope.init = function () {
	console.log("test case result init = " +tcResultLoaded);
	if(!tcResultLoaded) {
		loadTestCaseResult();
	}
};

function loadTestCaseResult() {
	console.log("load test case result = " +tcResultLoaded);
	var testCaseResult = testCaseResultService.getTestCaseResults($scope.testCaseID);
	testCaseResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   console.log("test case results length = "+testCaseResultService.getTestCaseResultsLength());
	   $scope.data = result; 
	   tcResultLoaded = true;
	}
	});
};


});//End TestCase Result Ctrl