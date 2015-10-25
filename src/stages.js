angular.module('sts', ['nvd3ChartDirectives'])
.factory('stageStore', function () {
    var stages = [
        {numPeople: 5, passThreshold: 2},
        {numPeople: 5, passThreshold: 4},
        {numPeople: 10, passThreshold: 12},
    ];

    var minPassThreshold = function() {
        return Math.max.apply(null, R.map(R.prop('passThreshold'), stages));
    };

    return {
        stages: stages,
        removeStage: function(index) {
            stages.splice(index, 1);
        },
        addStage: function(index) {
            stages.push({numPeople: 0, passThreshold: minPassThreshold(stages)});
        }
    };
})
.directive('addStage', function(stageStore) {
    return {
        scope: {},
        link: function(scope) {
            scope.add = stageStore.addStage;
        },
        template: '<button ng-click="add()">Add Stage</button>'
    };
})

.directive('stages', function (stageStore) {
    return {
        scope: {},
        link: function (scope) {
            scope.stageStore = stageStore;
        },
        template: '<stage stage-num="$index + 1" num-people="stage.numPeople" pass-threshold="stage.passThreshold" ng-repeat="stage in stageStore.stages"></stage>'
    };
})
.directive('stage', function (stageStore) {
    return {
        scope: {
            stageNum: "=",
            numPeople: "=",
            passThreshold: "="
        },
        link: function (scope) {
            scope.removeStage = function() {
                stageStore.removeStage(scope.stageNum - 1);
            };
        },
        templateUrl: "html/stage.html",
        replace: true
    };
});
