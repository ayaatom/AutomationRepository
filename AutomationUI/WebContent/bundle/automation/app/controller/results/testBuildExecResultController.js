app.controller('TestBuildExecResultCtrl', function($scope, $rootScope, $location,testBuildExecResultService, $routeParams,AUTOMATION_CONSTANTS) {

$scope.data = [];
var tbExecResultLoaded = false;
$scope.init = function () {
	console.log("test run exec result init = " +tbExecResultLoaded);
	if(!tbExecResultLoaded) {
		loadTestRunExecResult();
	}
};

$scope.viewTestRunResults = function (testBuildExecResult) {
	$rootScope.executionId = testBuildExecResult.executionId;
	$location.path("/buildExecResults/"+testBuildExecResult.buildId);
};


function loadTestRunExecResult() {
	console.log("load test build exec result = " +tbExecResultLoaded);
	var testBuildExecResult = testBuildExecResultService.getTestBuildExecResults();
	testBuildExecResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   $scope.data = result; 
	   $rootScope.buildResult = result;
	   tbExecResultLoaded = true;
	}
	});
};


});//End TestBuild Exec Result Ctrl