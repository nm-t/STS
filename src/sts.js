var round = function(x) {
    return Math.ceil(x * 1000) / 1000;
};

// Assumes input is in strictly ascending order by true success rate
var ctr = function(grid, weights) {
    console.log('HELLOjfdskfjasdkfjdkfsdjaklfdjskfdsjkfdasjfklda', grid);
    if (!weights) weights = R.repeat(1, grid.length);
    var outputPairs = [];
    grid.forEach(function (row) {
        outputPairs.push( {
            trueRate: round(row.trueRate),
            passFraction: round(row.passFraction)
        });
    });
    return outputPairs;
};

var ctrGivenS = function (grid, weights) {
    if (!weights) weights = R.repeat(1, grid.length);
    var outputPairs = [];
    var cumulativePassRate = 0;
    var trueRateProportion = 1/grid.length;

    var reversedGrid = R.reverse(grid);
    var reversedWeights = R.reverse(weights);

    var weightedRows = R.zip(reversedGrid, reversedWeights);

    var bayesDenom = R.reduce(function (acc, weightedRow) {
        var row = weightedRow[0];
        var weight = weightedRow[1];
        return acc + row.passFraction * weight;
    }, 0, weightedRows);

    var sumTrGivenS = 0;
    weightedRows.forEach(function(weightedRow) {
        var row = weightedRow[0];
        var weight = weightedRow[1];
        sumTrGivenS += (row.passFraction * weight) / bayesDenom;
        outputPairs.push({ trGivenS: round(sumTrGivenS), trueRate: round(row.trueRate) });
    });
    return outputPairs;
};

var ctrGivenF = function (grid, weights) {
    if (!weights) weights = R.repeat(1, grid.length);
    var outputPairs = [];
    var cumulativePassRate = 0;
    var trueRateProportion = 1/grid.length;

    var reversedGrid = R.reverse(grid);
    var reversedWeights = R.reverse(weights);

    var weightedRows = R.zip(reversedGrid, reversedWeights);

    var bayesDenom = R.reduce(function (acc, weightedRow) {
        var row = weightedRow[0];
        var weight = weightedRow[1];
        return acc + (1 -row.passFraction) * weight;
    }, 0, weightedRows);

    var sumTrGivenS = 0;
    weightedRows.forEach(function(weightedRow) {
        var row = weightedRow[0];
        var weight = weightedRow[1];
        sumTrGivenS += ((1 - row.passFraction) * weight) / bayesDenom;
        outputPairs.push({ trGivenF: round(sumTrGivenS), trueRate: round(row.trueRate) });
    });
    return outputPairs;
};

var to2dArrayParam = function (xParam, yParam) {
    return R.map(function (gridPoint) {
        return [gridPoint[xParam], gridPoint[yParam]];
    });
};

var to2dArray = R.map(function (gridPoint) {
    return [gridPoint.trueRate, gridPoint.passFraction];
});

