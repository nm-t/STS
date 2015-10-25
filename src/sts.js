// Assumes input is in strictly ascending order by true success rate
var ctr = function(grid, weights) {
    console.log('HELLOjfdskfjasdkfjdkfsdjaklfdjskfdsjkfdasjfklda', grid);
    if (!weights) weights = R.repeat(1, grid.length);
    var outputPairs = [];
    grid.forEach(function (row) {
        outputPairs.push( {
            trueRate: row.trueRate,
            passFraction: row.passFraction
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
        outputPairs.push({ trGivenS: sumTrGivenS, trueRate: row.trueRate });
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
        return acc + row.passFraction * weight;
    }, 0, weightedRows);

    var sumTrGivenS = 0;
    weightedRows.forEach(function(weightedRow) {
        var row = weightedRow[0];
        var weight = weightedRow[1];
        sumTrGivenS += ((1 - row.passFraction) * weight) / bayesDenom;
        outputPairs.push({ trGivenS: sumTrGivenS, trueRate: row.trueRate });
    });
    return outputPairs;
};

var endOfTrials = function (grid, weights) {
    if (!weights) weights = R.repeat(1, grid.length);    
    var outputSeries = {};

    if (!grid) {
        return {};
    }

    var sums = [];

    // get the first row to find the number of stages
    var first = grid[0];
    var total_stages = first['stageFailed'].length + 1; // last one is the pass
    for (var i=0; i < total_stages; i++) {
        outputSeries[i] = [];
        sums[i] = 0.0;
    }
    var weightedRows = R.zip(grid, weights);

    weightedRows.forEach(function(weightedRow){
        var row = weightedRow[0];
        var weight = weightedRow[1];

        row.stageFailed.forEach(function(failed, index) {
            sums[index] += failed * weight;
        });
        sums[total_stages-1] = row.passFraction * weight;
        total_at_stage = sums.reduce(function(a,b) { return a+b; }, 0);
        for (var i=0; i < total_stages; i++) {
            outputSeries[i].push([row.trueRate, sums[i] / total_at_stage]);
        }

    });

    return outputSeries;
};

var to2dArray = R.map(function (gridPoint) {
    return [gridPoint.trueRate, gridPoint.passFraction];
});

var testData1 = [
    { trueRate: 0.1, passFraction: 0.15 },
    { trueRate: 0.2, passFraction: 0.3 },
    { trueRate: 0.3, passFraction: 0.7 } 
];

var testData2 = [
    { trueRate: 0.1, passFraction: 0.2 },
    { trueRate: 0.2, passFraction: 0.3 },
    { trueRate: 0.3, passFraction: 0.7 }
];

var grid =  createGrid([
            {numPeople: 1, passThreshold: 1},
            {numPeople: 5, passThreshold: 3 },
            {numPeople: 10, passThreshold: 5},
], [0.2, 0.4, 0.7]);

console.log('sts', ctrGivenS(grid, [1, 1, 1]), grid);
