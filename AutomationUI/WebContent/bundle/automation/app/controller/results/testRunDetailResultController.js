app.controller('TestRunDetailResultCtrl', function($scope, $rootScope,$location,$http, $sce, ngDialog, testRunDetailResultService, $routeParams,AUTOMATION_CONSTANTS) {
	
$scope.buildId = $routeParams.buildId;
$scope.testRunId = $routeParams.testRunId;
$scope.iteration = $routeParams.iteration;
var trDetailResultLoaded = false;
$scope.init = function () {
	console.log("test run detail result init = " +trDetailResultLoaded);
	if(!trDetailResultLoaded) {
		if($routeParams.iteration) {
			loadTestRunDetailIterationResult();
		} else {
			loadTestRunDetailResult();
		}
	}
};

$scope.viewVideo = function(url) {
	 $rootScope.clearMsgs();
	console.log("test run detail controller openDefault");
	
	ngDialog.open({
		template : 'firstDialogId',
		controller : 'TestRunDetailResultCtrl',
		className : 'ngdialog-theme-default custom-width-img',
		data: url
	});
	
};


$scope.retrieveVideoContent = function (screenShotPath) {
	console.log(screenShotPath);
	var execMachine = String(screenShotPath.split("#")[0]);
	var filePath = String(screenShotPath.split("#")[1]);
	var url = "http://"+execMachine+"/AutomationExecutionEngine/services/engine/ExecutionService/retrieveTestResultVideoContent/";
	return $http.get(url,{params : {
		filePath : filePath
      }, headers: {'Content-Type': 'video/mp4'}, responseType: 'arraybuffer'})
	.then(function(response) {
		console.log(response.status);
		var blob = new Blob([response.data], {type: 'video/mp4'});
//        saveBlob(blob, 'test.png');
		var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
		if(urlCreator) {
			var url = urlCreator.createObjectURL(blob);
//			window.open(url);
//			$scope.viewVideo($sce.getTrustedUrl($sce.trustAsResourceUrl(url)));
			$scope.viewVideo(response.data);
//			urlCreator.revokeObjectURL(url);
		}
	});
};

$scope.viewTestStepResults = function(testRunDetailResult){
//     <span ng-if="!testRunDetailResult.iteration"><a ng-href="#/buildExecResults/{{buildId}}/{{testRunId}}/{{testRunDetailResult.testCaseId}}">{{testRunDetailResult.testCaseId}}</a></span> -->
	if($rootScope.testRunIteration != null && testRunDetailResult.iteration != null){
		$scope.viewIterationTestStepIterationResults(testRunDetailResult);
	} else if($rootScope.testRunIteration == null && testRunDetailResult.iteration != null) {
		$scope.viewTestStepIterationResults(testRunDetailResult);
	} else if($rootScope.testRunIteration != null && testRunDetailResult.iteration == null) {
		$scope.viewIterationTestStepResults(testRunDetailResult);
	} else {
		$location.path("/buildExecResults/"+$routeParams.buildId+"/"+$routeParams.testRunId+"/"+testRunDetailResult.testCaseId);
	}
	
}

$scope.viewTestStepIterationResults = function(testRunDetailResult){
//	 <a ng-href="#/buildExecIterationResults/{{buildId}}/{{testRunId}}/{{testRunDetailResult.testCaseId}}/{{testRunDetailResult.iteration}}">
 	$location.path("/buildExecIterationResults/"+$routeParams.buildId+"/"+$routeParams.testRunId+"/"
 			+testRunDetailResult.testCaseId+"/"+testRunDetailResult.iteration);
}

$scope.viewIterationTestStepIterationResults = function(testRunDetailResult){
//	 <a ng-href="#/buildExecIterationResults/{{buildId}}/{{testRunId}}/{{testRunDetailResult.testCaseId}}/{{testRunDetailResult.iteration}}">
	$location.path("/buildExecIterationResults/"+$routeParams.buildId+"/"+$routeParams.testRunId+"/"+
			testRunDetailResult.testCaseId+"/"+testRunDetailResult.iteration);
}

$scope.viewIterationTestStepResults = function(testRunDetailResult){
//	 <a ng-href="#/buildExecIterationResults/{{buildId}}/{{testRunId}}/{{testRunDetailResult.testCaseId}}/{{testRunDetailResult.iteration}}">
	$location.path("/buildExecResults/"+$routeParams.buildId+"/"+$routeParams.testRunId+"/"+testRunDetailResult.testCaseId);
}

function loadTestRunDetailResult() {
	console.log("load test run detail result = " +trDetailResultLoaded);
	var testStepResult = testRunDetailResultService.getTestRunDetailResults($rootScope.executionId,$routeParams.buildId,$routeParams.testRunId);
	testStepResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   $scope.data = result; 
	   trDetailResultLoaded = true;
	}
	});
};


function loadTestRunDetailIterationResult() {
	console.log("load test run detail result = " +trDetailResultLoaded);
	var testStepResult = testRunDetailResultService.getTestRunDetailIterationResults($rootScope.executionId, 
			$routeParams.buildId,$routeParams.testRunId,$routeParams.iteration);
	testStepResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   $scope.data = result; 
	   trDetailResultLoaded = true;
	}
	});
};

});//End TestStep Result Ctrl