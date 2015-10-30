var round = function(x) {
    return Math.ceil(x * 1000) / 1000;
};

// Assumes input is in strictly ascending order by true success rate
var ctr = function(grid) {
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
}

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

    // output looks a bit different

    var prepared = [];
    for (var i=0; i < total_stages - 1; i++) {
        prepared.push({ 'key' : 'Stage ' + (i + 1),
        'values' : outputSeries[i]
        });
    }
    prepared.push({
        'key' : 'Passed',
        'values' : outputSeries[total_stages - 1]
    });

    //console.log(prepared);

    return prepared;
};


var endOfTrialsExact = function (grid) {

    var outputSeries = {};

    if (!grid) {
        return {};
    }

    // get the first row to find the number of stages
    var first = grid[0];
    var total_stages = first['stageFailed'].length + 1; // last one is the pass
    for (var i=0; i < total_stages; i++) {
        outputSeries[i] = [];
    }

    grid.forEach(function(row){
        var at_stage = [];
        row.stageFailed.forEach(function(failed, index) {
            at_stage[index] = failed;
        });
        at_stage[total_stages-1] = row.passFraction;
        total_at_stage = at_stage.reduce(function(a,b) { return a+b; }, 0);
        for (var i=0; i < total_stages; i++) {
            outputSeries[i].push([row.trueRate, at_stage[i] / total_at_stage]);
        }

    });

    // output looks a bit different

    var prepared = [];
    for (var i=0; i < total_stages - 1; i++) {
        prepared.push({ 'key' : 'Stage ' + (i + 1),
        'values' : outputSeries[i]
        });
    }
    prepared.push({
        'key' : 'Passed',
        'values' : outputSeries[total_stages - 1]
    });

    //console.log(prepared);

    return prepared;
};


var to2dArray = R.map(function (gridPoint) {
    return [gridPoint.trueRate, gridPoint.passFraction];
});

