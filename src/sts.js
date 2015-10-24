// Assumes input is in strictly ascending order by true success rate
var ctr = function(grid) {
    var outputPairs = [];
    var cumulativePassRate = 0;
    grid.forEach(function (row, index) {
        cumulativePassRate += row.passFraction;
        outputPairs.push( {
            trueRate: row.trueRate,
            passFraction: cumulativePassRate / (index + 1)
        });
    });
    return outputPairs;
};

var ctrGivenS = function (grid, weights) {
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

var ctrGivenF = function (grid) {
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

var to2dArray = R.map(function (gridPoint) {
    return [gridPoint.trGivenS, gridPoint.trueRate];
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
