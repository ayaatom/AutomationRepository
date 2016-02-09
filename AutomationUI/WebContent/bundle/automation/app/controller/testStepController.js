app.controller('TestStepCtrl', function($scope, NgTableParams, $http, $sce,$filter,
		$rootScope, ngDialog, testStepService, screenControlService,$routeParams,$location,AUTOMATION_CONSTANTS,spinnerService) {
	console.log("Start TestStepCtrl " + $routeParams.testCaseID);
	$scope.currentPage = 1;
	$scope.testCaseID = $routeParams.testCaseID;
	$scope.screenCtrlTreedata = [];
	$scope.screenCtrlTypes = [];
	$scope.data = [];
	var tsLoaded = false;
	var screenControlTypesLoaded = false;
	$scope.controlTypes = [];
	$scope.actions = [];
	$scope.selectedBrowser="";	
	$scope.selectedMachine = "";
	$scope.browsers = [
	     			  {
	     			    "id": 1,
	     			    "text": "Chrome"
	     			  },
	     			  {
	     			    "id": 2,
	     			    "text": "Safari"
	     			  },
	     			  {
	     			    "id": 3,
	     			    "text": "IE"
	     			  },
	     			  {
	     				    "id": 4,
	     				    "text": "Firefox"
	     			}];
	
	//console.log("length" + $scope.data.length);
	$scope.init = function() {
		$rootScope.clearMsgs();
		console.log("test step controller init");
		if(!tsLoaded) {
			loadTestStep();
			loadScreenControl();
			loadActions();
		}
		if(!screenControlTypesLoaded){
			loadMachines();
			loadScreenControlTypes();
		}
	};
	
	$scope.getActionName = function(actionId){
		var actionName = '';
		if(actionId !== undefined && actionId !== null && actionId !== '-1') {
		var actionLen = $scope.actions.length;
			for(var j = 0; j< actionLen; j++){
				if(actionId == $scope.actions[j].id){
					actionName = $scope.actions[j].text;
					break;
				}
			}
		}	
			return actionName;
	};
	
	function loadTestStep() {
		console.log("test step controller loadTestStep");
		var testStepResult = testStepService.getTestStepList($routeParams.testCaseID);
		testStepResult.then(function(result) {
			if (result !== undefined) {
				$scope.data = result;
				tsLoaded = true;
			}
		});
	};
	
	function loadScreenControlTypes() {
		console.log("test step controller loadScreenControlTypes");
		var screenControlResult = screenControlService.loadScreenControlTypes();
		screenControlResult.then(function(result) {
			$scope.screenCtrlTypes = result;
		});
		screenControlTypesLoaded=true;
		console.log($scope.screenCtrlTypes);
	};
	
	

	function loadActions() {
		console.log("test step controller loadActions");
		var actionsResult = testStepService.loadActions();
		actionsResult.then(function(result) {
			$scope.actions = result;
		});
	};

	function loadMachines() {
		console.log("test step controller loadMachines");
		var machinesResult = testStepService.loadMachines();
		machinesResult.then(function(result) {
			$rootScope.machineDetails = result;
			console.log("machines value" + $rootScope.machineDetails);
		});
	};
	
	function loadScreenControl() {
		console.log("test step controller loadScreenControl");
		var screenControlResult = screenControlService.loadScreenControl();
		screenControlResult.then(function(result) {
			$scope.screenCtrlTreedata = result;
		});
	};

	$scope.openDefault = function($index) {
		var dialogData = {"index":$index,
				"data": $scope.screenCtrlTreedata};
		 $rootScope.clearMsgs();
		console.log("test step controller openDefault");
		$rootScope.theme = 'ngdialog-theme-plain custom-width';
		ngDialog.open({
			template : 'firstDialogId',
			controller : 'TestStepCtrl',
			className : 'ngdialog-theme-default custom-width ',
			data: dialogData
		});
	};
	
	$scope.startExecution = function() {
		 $rootScope.clearMsgs();
		console.log("test step controller start execution selected field  = " + this.selectedField.header);
		console.log("test step controller start execution selected environment  = " + this.selectedEnv.environment);
		console.log("test step controller start execution selected fieldsettings  = " + this.selectedEnv.fieldsettings);
		console.log("test step controller start execution selected browser  = " + this.selectedBrowser);
		var execDetailObj = {
			"testCaseId": $scope.testCaseID,
			"applicationName":  $rootScope.applicationName,
			"applicationId":  $rootScope.applicationId,
			"settingsId": this.selectedField.id,
			"environment": this.selectedEnv.environment,
			"fieldSettings": this.selectedEnv.fieldsettings,
			"browser": this.selectedBrowser.text,
			"machine": this.selectedMachine  
		};
		ngDialog.close();
		testStepService.executeTest(execDetailObj);
	};
	
	$scope.executeTest = function() {
		 $rootScope.clearMsgs();
		console.log("test step controller executeTest. Test Case ID = " + $scope.testCaseID);
		ngDialog.open({
			template : 'executeDialog',
			controller : 'TestStepCtrl',
			data: $rootScope.appDetails
		});
	};
	
	$scope.lastExecutionResult = function() {
		 $rootScope.buildId = null;
		console.log("test step controller executeTest. Test Case ID = " + $scope.testCaseID);
		ngDialog.open({
			template : 'executeDialog',
			controller : 'TestStepCtrl',
			data: $rootScope.appDetails
		});
	};

	console.log("Tree control initiated");
	$scope.remove = function(scope) {
		 $rootScope.clearMsgs();
		scope.remove();
	};

	$scope.visible = function(item) {
		if ($scope.query && $scope.query.length > 0
				&& item.title.indexOf($scope.query) == -1) {
			return false;
		}
		return true;
	};

	$scope.findNodes = function() {

	};

	$scope.toggleTree = function(treeObj) {
		treeObj.collapsed = !treeObj.collapsed;
	};

	$scope.newTestStepObj = {};
	$scope.newTestStepObjArr = [];
	Array.prototype.removeByIndex = function(index) {
		this.splice(index, 1);
	}
	Array.prototype.removeTestStepById = function(val) {
		for(var i=0; i<this.length; i++) {
			if(this[i].controlId == val) {
				this.splice(i, 1);
				break;
			}
		}
	}
	$scope.printParent = function ($event) {
		$scope.newTestStepObj = {};
		$scope.newTestStepObj.$edit = true;
		var root = $scope;
		var currentScope = angular.element($event.target).scope();
		console.log('selected Node details: ', currentScope.node);
		if(currentScope.node.isChecked == true){
			$scope.newTestStepObj.controlId = currentScope.node.id;
			$scope.newTestStepObj.controlName = currentScope.node.title;
			$scope.newTestStepObj.objProp = currentScope.node.objProp;
			$scope.newTestStepObj.objPropType=currentScope.node.objPropType;
			$scope.newTestStepObj.action={"id": "-1"};//Setting dummy action id will be replaced on edit
			$scope.newTestStepObjArr.push($scope.newTestStepObj);
		} else {
			$scope.newTestStepObjArr.removeTestStepById(currentScope.node.id);
		}
		console.log('Number of the selected items: ',$scope.newTestStepObjArr);
		console.log('object type added: ', currentScope.node.objPropType);
		currentScope = currentScope.$parent;
		console.log('parents::');
		while (currentScope.$id !== root.$id) {
			currentScope = currentScope.$parent;
			if (currentScope.node.type !== undefined
					&& currentScope.node.type === 'SCREEN') {
				console.log(currentScope.node);
				$scope.newTestStepObj.screenId = currentScope.node.id;
				$scope.newTestStepObj.screenName = currentScope.node.title;
				break;
			}
		}
	};
	
	$scope.onSelectTreeNode = function(nodeValue, scope, $event) {
		 $rootScope.clearMsgs();
		console.log("test step controller onSelectTreeNode");
		var nodeParentValue = scope.$parent.$modelValue;
		//var nodeValue = scope.$modelValue;
//		var nodeParentValue = scope.$parent.$modelValue;
		$scope.newTestStepObj = {};
		$scope.newTestStepObj.screenId=nodeParentValue.id;
		$scope.newTestStepObj.screenName=nodeParentValue.title;
		$scope.newTestStepObj.controlId=nodeValue.id;
		$scope.newTestStepObj.controlName=nodeValue.title;
		$scope.newTestStepObj.objProp=nodeValue.objProp;
		$scope.newTestStepObj.objPropType=nodeValue.objPropType;
		
//		$scope.newTestStepObj.$edit = true;
		/*for (var i = 0; i < nodeValue.nodes.length; i++) {
			nodeValue.nodes[i].isChecked = nodeValue.isChecked;
			if (nodeValue.nodes[i].nodes.length > 0) {
				$scope.recursiveTreeNode(nodeValue.nodes[i].nodes[0],
						nodeValue.isChecked);
			}
		}*/
	};

	$scope.recursiveTreeNode = function(childNode, checked) {
		childNode.isChecked = checked;
		for (var i = 0; i < childNode.nodes.length; i++) {
			if (childNode.nodes[i].nodes.length > 0) {
				$scope.recursiveTreeNode(nodeData.nodes[i].nodes[0], checked);
			}
		}
	};
	console.log("screenCtrlTreedata" + $scope.screenCtrlTreedata);


$scope.addTestStep = function(index) {
	 $rootScope.clearMsgs();
	console.log("test step controller addTestStep");
	console.log("add test step " + $scope.newTestStepObjArr);
	var len = $scope.newTestStepObjArr.length;
	var dataLength = testStepService.getTestStepLength();
	for(var i = 0; i < len; i++){
		$scope.newTestStepObjArr[i].applicationId = $rootScope.applicationId;
		$scope.newTestStepObjArr[i].applicationName=$rootScope.applicationName;
		$scope.newTestStepObjArr[i].testCaseId= $routeParams.testCaseID;
		if(index !== undefined && index !== null && index !== "") {
			$scope.newTestStepObjArr[i].index= index + (i+1);
		} else {
			$scope.newTestStepObjArr[i].index= dataLength + (i+1);	
		}
	}
	testStepService.addTestStep($scope.newTestStepObjArr,$scope,index);
	ngDialog.close();
};

$scope.removeTestStep = function (testStep) {
	 $rootScope.clearMsgs();
    var index = -1;	
    for( var i = 0; i < $scope.data.length; i++ ) {
		  if( $scope.data[i].testStepNumber === testStep.testStepNumber) {
			  index = i;
			  break;
		  }
	  }
	  if( index === -1 ) {
		  alert( "Something gone wrong" );
	  }
	  $scope.data.splice(index, 1);
	  testStepService.removeTestStep(testStep);
};

$scope.updateTestStep = function (testStep) {
	 $rootScope.clearMsgs();
	testStep.$edit = false;
	testStepService.updateTestStep(testStep);
};

$scope.closeSecond = function() {
	ngDialog.close();
};


$scope.insertTestStep= function (testStep,$index) {
	var insertToStep = $index;
	if($scope.__default__currentPage !== undefined && $scope.__default__currentPage !== null && $scope.__default__currentPage !== 1) {
		insertToStep = insertToStep + (($scope.__default__currentPage - 1) * AUTOMATION_CONSTANTS.ITEMS_PER_PAGE);
	}
	if((insertToStep +1) === $scope.data.length) {
		return;
	}
	$scope.openDefault(insertToStep);
	$rootScope.clearMsgs();
};

$scope.moveUpTestStep= function (testStep,$index) {
	 $rootScope.clearMsgs();
	 spinnerService.show('mySpinner');
	console.log("moveUpTestStep=" + testStep.testStepNumber);
	console.log("moveUpTestStep $index=" + $index);
	 if($index === 0) {return;}
	 move($index,$index-1,testStep);
	 spinnerService.hide('mySpinner');
};

$scope.moveDownTestStep= function (testStep,$index) {
	 $rootScope.clearMsgs();
	 spinnerService.show('mySpinner');
	console.log("moveDownTestStep=$index=" + $index);
	console.log("moveDownTestStep=$scope.data.length=" + $scope.data.length);
	if($index+1 === $scope.data.length) {return;}
	move($index,$index+1,testStep); 
	 spinnerService.hide('mySpinner');
};

var move = function (origin, destination,testStep) {
	var temp = $scope.data[destination];
	var tempIndex = temp.index;
	temp.index = testStep.index;
	testStep.index = tempIndex;
	$scope.data[destination] = testStep;
	$scope.data[origin] = temp;
	testStepService.updateTestStep(testStep);
	testStepService.updateTestStep(temp);
};

$scope.saveTestStepsObj = function() {
	 $rootScope.clearMsgs();
	testStepService.addUpdateTestSteps($scope, $scope.data, $routeParams.testCaseID);
};

$scope.fieldComparator = function (actual, expected) {
    return angular.equals(""+expected, ""+actual);
}

});