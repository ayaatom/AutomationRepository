app.controller('TestStepResultCtrl', function($http, $scope, $rootScope, ngDialog,testStepResultService, $routeParams,AUTOMATION_CONSTANTS) {

$scope.data = [];
var tsResultLoaded = false;
$scope.init = function () {
	console.log("test step result init = " +tsResultLoaded);
	if(!tsResultLoaded) {
		if($routeParams.buildId !== null) {
			loadTestStepBuildResult();
		} else {
			loadTestStepLastExecutionResult();
		}
	}  
};

$scope.viewDialog = function(url) {
	 $rootScope.clearMsgs();
	console.log("test step controller openDefault");
	ngDialog.open({
		template : 'firstDialogId',
		controller : 'TestStepResultCtrl',
		className : 'ngdialog-theme-default custom-width-img',
		data: url
	});
};

$scope.viewScreenShot = function (screenShotPath) {
	console.log(screenShotPath);
	var execMachine = String(screenShotPath.split("#")[0]);
	var filePath = String(screenShotPath.split("#")[1]);
	var url = "http://"+execMachine+"/AutomationExecutionEngine/services/engine/ExecutionService/retrieveTestResultContent/";
	return $http.get(url,{params : {
		filePath : filePath
      }, headers: {'Content-Type': 'image/png'}, responseType: 'arraybuffer'})
	.then(function(response) {
		console.log(response.status);
		var blob = new Blob([response.data], {type: 'image/png'});
//        saveBlob(blob, 'test.png');
		var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
		if(urlCreator) {
			var url = urlCreator.createObjectURL(blob);
//			window.open(url);
			$scope.viewDialog(url);
		}
	});
};

function loadTestStepLastExecutionResult() {
	console.log("load test step result = " +tsResultLoaded);
	var testStepResult = testStepResultService.getTestStepLastExecutionResults($routeParams.testCaseID);
	testStepResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   $scope.data = result; 
	   tsResultLoaded = true;
	}
	});
};

function loadTestStepBuildResult() {
	console.log("load test step build result = " +tsResultLoaded);
	var testStepResult = testStepResultService.getTestStepBuildResults($rootScope.executionId, 
			$routeParams.buildId,$routeParams.testRunId,$rootScope.testRunIteration,$routeParams.testCaseId,$routeParams.iteration);
	testStepResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   $scope.data = result; 
	   tsResultLoaded = true;
	}
	});
};

});//End TestStep Result Ctrl