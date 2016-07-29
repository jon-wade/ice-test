var input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

//function to check that three elements sum to 15
var checkSum = function (indexOne, indexTwo, indexThree) {
    return (indexOne + indexTwo + indexThree === 15);
};

//function to check an array of 9 numbers to see if they are a magic square or not
var magicSquare = function(results) {

    var check = function(array) {

        //first row of the square
        var firstRow = checkSum(array[0], array[1], array[2]);

        //second row of the square
        var secondRow = checkSum(array[3], array[4], array[5]);

        //third row of the square
        var thirdRow = checkSum(array[6], array[7], array[8]);

        //first column of the square
        var firstColumn = checkSum(array[0], array[3], array[6]);

        //second column of the square
        var secondColumn = checkSum(array[1], array[4], array[7]);

        //third column of the square
        var thirdColumn = checkSum(array[2], array[5], array[8]);

        //left to right diagonal of the square
        var ltrDiag = checkSum(array[0], array[4], array[8]);

        //right to left diagonal of the square
        var rtlDiag = checkSum(array[2], array[4], array[6]);

        //conditional to check for a magic square
        if (firstRow && secondRow && thirdRow && firstColumn && secondColumn && thirdColumn && ltrDiag && rtlDiag) {
            console.log('magic square = ', array);
        }
        else {
            // console.log('not a magic square!');
        }
    };

    //check each element of the array 'results' passed into the function to see if they are magic squares or not
    for (var i=0; i<results.length; i++) {
        check(results[i]);
    }
};

//this is the hard bit, working out all total permutations of the input array
//the object argument to begin with is the 'data' object
var permutation = function(object){

    //
    var output = [];

    //check to see if the object passed into the function has any remaining elements to be pushed into a tree or not
    //if there are no remaining elements...
    if (object.remainder.length===0){
        //were now at the bottom of the tree, so we need to 'read off' all the nodes back to the top by calling printResults()
        printResults(object, output);
        //once the tree has been traversed back to the top, store the array of node values in the 'final' results array
        final.push(output);
        //check to see if we have the correct number of elements of the final array (which is the total number of permutations of the input array)
        if(final.length === perms) {
            console.log('finished');
            //and if so, call the magicSquare function to check each of the elements in turn
            magicSquare(final);
        }
    }
    //if there are remaining elements...
    for (var i=0; i<object.remainder.length; i++){
        //create a copy of the remainder array and store it in the temp variable
        var temp = object.remainder.slice();
        //remove the first element of the copied remainder array and store it in the store variable
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














