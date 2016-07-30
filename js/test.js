module.exports = function(input) {

    return new Promise(function(resolve, reject) {
        //variable to store the output array of all possible permutations
        var final = [];

        //first work out how long the final array should be - mathematically the total number of permutations of n items is n!
        //create a factorial function as no native method in JS
        var factorial = function(n) {
            if (n <= 1) return 1;
            return n*factorial(n-1);
        };

        //then work out n!
        var perms = factorial(input.length);

        //create a constructor function for the object to store the data tree for all possible permutations of the input array
        //store is the integer to be stored at each node
        //remainder is the remaining elements of the array to be stored in the tree
        //last is a pointer to the last node on the tree
        var obj = function (store, remainder, last) {
            this.store = store;
            this.remainder = remainder;
            this.last = last;
        };

        //instantiate the storage object with nothing stored at the node, the entire array as a remainder and last as null (as this is the top node of the tree)
        var data = new obj(null, input, null);

        //this is the hard bit, working out all total permutations of the input array
        //the object argument to begin with is the 'data' object
        var permutation = function(object){

            //this is an array to store the node values when traversing from the bottom to the top of the permuation tree
            var output = [];

            //check to see if the object passed into the function has any remaining elements to be pushed into a tree or not
            //if there are no remaining elements...
            if (object.remainder.length===0){
                //were now at the bottom of the tree, so we need to 'read off' all the nodes back to the top by calling printResults()
                printResults(object, output);
                //once the tree has been traversed back to the top, store the array of node values for that particular path to the top in the 'final' results array
                final.push(output);
                //check to see if we have the correct number of elements of the final array (which is the total number of permutations of the input array)
                if(final.length === perms) {
                    // console.log('finished');
                    //and if so, resolve the promise and return the final array
                    resolve(final);
                }
            }
            //if there are remaining elements...
            for (var i=0; i<object.remainder.length; i++){
                //create a copy of the remainder array and store it in the temp variable
                var temp = object.remainder.slice();
                //remove the element at index i of the copied remainder array and store it in the store variable, creating new branches
                var store = temp.splice(i, 1);
                //instantiate a new data store object which stores the element just spliced off at this node of the tree
                //put the remaining array elements into the 'remaining' property
                //and store the current state of the data tree in the 'last' property so we can traverse back up the tree later
                var data = new obj(store, temp, object);
                //recursively call the permutation function with the new data object
                permutation(data);
            }
        };

        var printResults = function(object, arr){
            //check were not at the top of the tree
            if(object.last !==null){
                //push the element stored at each node into the output array
                arr.push(object.store[0]);
                //recursively traverse back up the tree
                printResults(object.last, arr);
            }
        };

        //run the routine
        permutation(data);
    });
};



















