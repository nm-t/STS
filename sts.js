[{
    trueRate,
    int pass,
    [numSuccess],
    stageFailed
}]

[(cumulativeTrueRate, successRate)]

function(grid) {
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
}