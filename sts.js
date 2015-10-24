// [{
//     trueRate,
//     int pass,
//     [numSuccess],
//     stageFailed
// }]

// [(cumulativeTrueRate, successRate)]

// Assumes input is in strictly ascending order by true success rate
var ctrS = function(grid) {
    var outputPairs = [];

    var lastTrueRate = grid[0].trueRate;

    var successes = 0;

    var totalTrials = 0;

    grid.forEach(function (row) {
        if (lastTrueRate !== row.trueRate) {
            outputPairs.push({ trueRate: lastTrueRate, successRate: successes / totalTrials });
            lastTrueRate = row.trueRate;
        }

        successes += row.pass;
        totalTrials += 1;
    });

    outputPairs.push({ trueRate: lastTrueRate, successRate: successes / totalTrials })
    return outputPairs;
};

var testData1 = [
 { trueRate: 0.1,
     pass: 1,
     numSuccess: [1, 2, 3],
     stageFailed: -1
 },
 { trueRate: 0.1,
     pass: 1,
     numSuccess: [1, 2, 3],
     stageFailed: -1
 },
 { trueRate: 0.2,
     pass: 0,
     numSuccess: [1, 2, 3],
     stageFailed: 2
 },
 { trueRate: 0.2,
     pass: 1,
     numSuccess: [1, 2, 3],
     stageFailed: -1
 },
 { trueRate: 0.3,
     pass: 0,
     numSuccess: [1, 2, 3],
     stageFailed: 1
 },
 { trueRate: 0.3,
     pass: 1,
     numSuccess: [1, 2, 3],
     stageFailed: -1
 },
 { trueRate: 0.3,
     pass: 1,
     numSuccess: [1, 2, 3],
     stageFailed: -1
 }
];

console.log(ctr(testData1));
