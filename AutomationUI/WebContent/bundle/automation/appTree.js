app.controller('treeCtrl', function($scope, $filter) {
	console.log("Tree control initiated");
    $scope.remove = function(scope) {
      scope.remove();
    };

    
    $scope.visible = function(item) {
      if ($scope.query && $scope.query.length > 0
        && item.title.indexOf($scope.query) == -1) {
        return false;
      }
      return true;
    };

    $scope.findNodes = function(){

    };

$scope.toggleTree = function(treeObj) {
          treeObj.collapsed = !treeObj.collapsed;
        };

	$scope.onSelectTreeNode = function(nodeData){
		//var nodeData = node.$modelValue;
		alert(nodeData.title+"Main checked:"+nodeData.isChecked);
		for(var i = 0; i < nodeData.nodes.length; i++) {
				//alert(nodeData.nodes[i].title);
				nodeData.nodes[i].isChecked=nodeData.isChecked;
				if(nodeData.nodes[i].nodes.length > 0) {
					$scope.recursiveTreeNode(nodeData.nodes[i].nodes[0], nodeData.isChecked);
				}
		}
    };

	$scope.recursiveTreeNode = function(childNode,checked){
		childNode.isChecked=checked;
		//alert(childNode.title +"checked:"+childNode.isChecked);
		for(var i = 0; i < childNode.nodes.length; i++) {
				if(childNode.nodes[i].nodes.length > 0) {
					$scope.recursiveTreeNode(nodeData.nodes[i].nodes[0],checked);
				}
		}
    };


    $scope.data = [{
      "id": 1,
      "title": "node1",
	  "isChecked":false,
      "nodes": [
        {
          "id": 11,
          "title": "node1.1",
		  "isChecked":false,	
          "nodes": [
            {
              "id": 111,
              "title": "node1.1.1",
"isChecked":false,	          				
"nodes": []
            }
          ]
        },
        {
          "id": 12,
          "title": "node1.2",
		  "isChecked":false,	
          "nodes": []
        }
      ],
    }, {
      "id": 2,
      "title": "node2",
"isChecked":false,	      
"nodes": [
        {
          "id": 21,
          "title": "node2.1","isChecked":false,          
          "nodes": [],
        },
        {
          "id": 22,
          "title": "node2.2","isChecked":false,
          "nodes": []
        }
      ],
    }, {
      "id": 3,
      "title": "node3","isChecked":false,
      "nodes": [
        {
          "id": 31,
          "title": "node3.1","isChecked":false,
          "nodes": []
        }
      ],
    }, {
      "id": 4,
      "title": "node4","isChecked":false,
      "nodes": [
        {
          "id": 41,
          "title": "node4.1","isChecked":false,
          "nodes": []
        }
      ],
    }];
  });