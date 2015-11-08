(function() {

    var runSeqTrial = function(stages, trueRate) {

        // passed_previous and pass_current keeps the fraction of trials where i people were affected
        // indexed by i. eg [3] is the probability that exactly 3 people were affected
        // pass_previous keeps the numbers from the previous stage, pass_current is used
        // to calculate the current stage
        var passed_previous = [1.0];
        var pass_current = [];  
        var previous_cutoff = 0;
        var failed_stage = [];
        var passed_stage = [];

		stages.forEach(function(stage) {
			// Initialise the 
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

            //console.log('pass current ' + pass_current);
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
        //console.log('pass ' + pass);
        //console.log('passed stage ' + passed_stage);
        //console.log('failed stage ' + failed_stage);
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
    		for (var i=1; i < count - 1; i++) {
    			current += gap;
    			rates[rates.length] = current;
    		}
            rates[rates.length] = max;
    		return rates;
    	}
    };

    window.sampleWeights = function(rates, distribution_name, distribution_parameters) {
        var get = function(object, key, default_value) {
            if (key in object)
                return object[key];
            else
                return default_value;
        };

        if (distribution_parameters === undefined)
            distribution_parameters = {};
        var weights = [];

        if (distribution_name == 'uniform') {
            var min = get(distribution_parameters, 'min', 0.0);
            var max = get(distribution_parameters, 'max', 1.0);

            rates.forEach(function(rate) {
                if (rate < min || rate > max) {
                    // TODO: do we need to normalise this?
                    weights[weights.length] = 0.0;  
                } else {
                    weights[weights.length] = 1.0;
                }
            });
        } else if (distribution_name == 'logitnormal') {
            var mu = get(distribution_parameters, 'mu', 0.0);
            var sigma = get(distribution_parameters, 'sigma', 0.25);


            var logit = function(z) {
                return Math.log(z / (1.0 - z));
            }
            rates.forEach(function(rate) {
                if (rate == 0.0 || rate == 1.0) {
                    weights.push(0.0);
                } else {
                    var p = jStat.normal.pdf(logit(rate), mu, sigma);
                    weights.push(p / (rate * (1.0 - rate)));
                }
            });
        } else if (distribution_name == 'beta') {
            var alpha = get(distribution_parameters, 'alpha', 2.0);
            var beta = get(distribution_parameters, 'beta', 2.0);
            rates.forEach(function(rate) {
                var p = jStat.beta.pdf(rate, alpha, beta);
                weights.push(p);
            });

        }


        return weights;
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

