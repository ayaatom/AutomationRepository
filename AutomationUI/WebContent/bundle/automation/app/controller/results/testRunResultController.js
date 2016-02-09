app.controller('TestRunResultCtrl', function($scope, $rootScope,$location,testRunResultService, $routeParams,AUTOMATION_CONSTANTS) {

$scope.data = [];
$scope.buildId = $routeParams.buildId;
var trResultLoaded = false;
$scope.init = function () {
	console.log("test run exec result init = " +trResultLoaded);
	if(!trResultLoaded) {
		loadTestRunResult();
	}
};

$scope.viewTestRunDetailIterationResults = function(testRunResult){
	$rootScope.testRunIteration = testRunResult.iteration;
	$location.path("/buildExecIterationResults/"+$routeParams.buildId+"/"+testRunResult.testRunId+"/"+testRunResult.iteration);
};

$scope.viewTestRunDetailResults = function(testRunResult){
	$rootScope.testRunIteration = null;
	$location.path("/buildExecResults/"+$routeParams.buildId+"/"+testRunResult.testRunId);
};

function loadTestRunResult() {
	console.log("load test run result = " +trResultLoaded);
	var testRunResult = testRunResultService.getTestRunResults($rootScope.executionId,$scope.buildId);
	testRunResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   $scope.data = result; 
	   trResultLoaded = true;
	}
	});
};


});//End TestBuild Exec Result Ctrl