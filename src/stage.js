(function() {
    var binomials = {};


    var runSeqTrial = function(stages, trueRate) {
        var passed_previous = [1.0];
        var pass_current = [];
        var previous_cutoff = 0;
        var failed_stage = [];
        var passed_stage = [];

		stages.forEach(function(stage) {
			// Initialise
			for (var index=previous_cutoff; index < passed_previous.length + stage.numPeople; index++) {
				pass_current[index] = 0.0;
			}


            for (var people=0; people <= stage.numPeople; people++) {
                affected = jStat.binomial.pdf(people, stage.numPeople, trueRate);
                var previous_length = passed_previous.length;
                for (var index=previous_cutoff; index < previous_length; index++) {
                    pass_current[index + people] += passed_previous[index] * affected;
                }
            }

            console.log('pass current ' + pass_current);
            var failed_at_stage = 0.;
            for (var index=previous_cutoff; index < stage.passThreshold; index++) {
                failed_at_stage += pass_current[index];
            }
            failed_stage[failed_stage.length] = failed_at_stage;
            average_passed_stage = 0.;

			for (var index=0; index < pass_current.length; index++) {
				average_passed_stage += pass_current[index] * index
			}
			passed_stage[passed_stage.length] = average_passed_stage;

			previous_cutoff = stage.passThreshold;
			passed_previous = pass_current;
			pass_current = pass_current.slice(0, stage.passThreshold);
		});


        var pass = 0.;
        for (var index=previous_cutoff; index < passed_previous.length; index++) {
            pass += passed_previous[index];
        }
        console.log('pass ' + pass);
        console.log('passed stage ' + passed_stage);
        console.log('failed stage ' + failed_stage);
        return [pass, passed_stage, failed_stage];
    };

    window.createGrid = function(stages, rates) {
        var results = [];
        var passed;
        var died_at_stage;
        rates.forEach(function(rate) {
            var rate_results = runSeqTrial(stages, rate);
            passed = rate_results[0];
            passed_stage = rate_results[1];
            died_at_stage = rate_results[2];
            results[results.length] = { 
                'trueRate' : rate,
                'passFraction' : passed,
                'numSuccesses' : passed_stage,
                'stageFailed' : died_at_stage,
            };
        });

        return results;
    };


    window.interpolateRates = function(min, max, count) {
    	if (count == 0) {
    		return [];
    	} else if (count == 1) {
    		return [max];
    	} else {
    		var rates = [min];
    		var gap = (max - min) / (count - 1);
    		var current = min;
    		for (var i=1; i < count; i++) {
    			current += gap;
    			rates[rates.length] = current;
    		}
    		return rates;
    	}
    };

    var cdfit = function(stages, rate) {
    	var product = 1.0;

    	var nominator = 0.;
    	var denominator = 0.;

    	stages.forEach(function(stage, stage_index) {
    		nominator = stage.passThreshold;
    		denominator += stage.numPeople;
    		console.log('cdf of ' + nominator + ', ' + denominator + ': ' + jStat.binomial.cdf(nominator, denominator, rate));
    		product *= (1.0 - jStat.binomial.cdf(nominator, denominator, rate));
    	});
    	return product;
    };
	
	/*
	createGrid([{ 'numPeople' : 1, 'passThreshold' : 1}, 
		{'numPeople' : 1, 'passThreshold' : 2},
		{'numPeople' : 1, 'passThreshold' : 3}], [0.5]);

	createGrid([{ 'numPeople' : 2, 'passThreshold' : 1}, 
		{'numPeople' : 2, 'passThreshold' : 2},
		], [0.5]);
	createGrid([{ 'numPeople' : 3, 'passThreshold' : 2}, 
		{'numPeople' : 2, 'passThreshold' : 3},
		{'numPeople' : 3, 'passThreshold' : 6},
		], [0.5]);

	createGrid([{ 'numPeople' : 1, 'passThreshold' : 1}, 
		{'numPeople' : 1, 'passThreshold' : 2},
		{'numPeople' : 1, 'passThreshold' : 3},
		{'numPeople' : 1, 'passThreshold' : 4}], [0.5]);

	createGrid([{ 'numPeople' : 5, 'passThreshold' : 2}, 
		{'numPeople' : 5, 'passThreshold' : 4},
		{'numPeople' : 10, 'passThreshold' : 12},
		], [0.6]);


	console.log(cdfit([{ 'numPeople' : 5, 'passThreshold' : 2}, 
		{'numPeople' : 5, 'passThreshold' : 4},
		{'numPeople' : 10, 'passThreshold' : 12},
		], [0.6]));
	*/

	//console.log(interpolateRates(0, 1, 20));
})();

