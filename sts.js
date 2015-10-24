// [{
//     trueRate,
//     int pass,
//     [numSuccess],
//     stageFailed
// }]

// [(cumulativeTrueRate, successRate)]
//
//

var R = require("ramda");

// Assumes input is in strictly ascending order by true success rate
var ctr = function(grid) {
    var outputPairs = [];
    var cumulativePassRate = 0;
    grid.forEach(function (row, index) {
        cumulativePassRate += row.passRate;
        outputPairs.push( {
            trueRate: row.trueRate,
            passRate: cumulativePassRate / (index + 1)
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
        return acc + row.passRate * weight;
    }, 0, weightedRows);

    var sumTrGivenS = 0;
    weightedRows.forEach(function(weightedRow) {
        var row = weightedRow[0];
        var weight = weightedRow[1];
        sumTrGivenS += (row.passRate * weight) / bayesDenom;
        outputPairs.push({ trGivenS: sumTrGivenS, trueRate: row.trueRate });
    });
    return outputPairs;
};

var ctrGivenF = function (grid) {
    var outputPairs = [];
    var cumulativePassRate = 0;
    var trueRateProportion = 1/grid.length;

    grid.forEach(function (row) {
        cumulativePassRate += (1 - row.passRate) * trueRateProportion;
        outputPairs.push( { trueRate: row.trueRate, passRate: cumulativePassRate  });
    });
    return outputPairs;
};

var testData1 = [
    { trueRate: 0.1, passRate: 0.15 },
    { trueRate: 0.2, passRate: 0.3 },
    { trueRate: 0.3, passRate: 0.7 } 
];

var testData2 = [
    { trueRate: 0.1, passRate: 0.2 },
    { trueRate: 0.2, passRate: 0.3 },
    { trueRate: 0.3, passRate: 0.7 }
];

console.log(ctrGivenS(testData1, [1,1,1]));
