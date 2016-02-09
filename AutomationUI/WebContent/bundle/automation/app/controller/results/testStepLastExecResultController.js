app.controller('TestStepLastExecResultCtrl', function($http, $scope, ngDialog, testStepResultService, $rootScope, $routeParams,AUTOMATION_CONSTANTS) {

$scope.data = [];
var tsleResultLoaded = false;
$scope.init = function () {
	console.log("test step result init = " +tsleResultLoaded);
	if(!tsleResultLoaded) {
		loadTestStepLastExecutionResult();
	}  
};

$scope.viewDialog = function(url) {
	 $rootScope.clearMsgs();
	console.log("test step controller openDefault");
	ngDialog.open({
		template : 'firstDialogId',
		controller : 'TestStepLastExecResultCtrl',
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
//        saveAs(blob, 'test.png');
		var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
		if(urlCreator) {
			var url = urlCreator.createObjectURL(blob);
			//window.open(url);
			$scope.viewDialog(url);
		}
	});
};

function loadTestStepLastExecutionResult() {
	console.log("load test step result = " +tsleResultLoaded);
	var testStepResult = testStepResultService.getTestStepLastExecutionResults($routeParams.testCaseID);
	testStepResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   $scope.data = result; 
	   tsleResultLoaded = true;
	}
	});
};


});//End TestStep Result Ctrl