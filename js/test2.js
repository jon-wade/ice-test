var prompt = require('prompt');
var permutate = require('./test.js');
var calculate = require('./test3.js');


prompt.message = '';
prompt.delimiter = '';

prompt.start();

prompt.get([
    {
        name: 'size',
        description: 'Enter size of magic square (e.g. for 3x3 enter 3):'
    },
    {
        name: 'start',
        description: 'Enter starting number of magic square series:'
    },
    {
        name: 'end',
        description: 'Enter ending number of magic square series:'
    }], function(err, result) {

        var size = parseInt(result.size);
        var start = parseInt(result.start);
        var end = parseInt(result.end);

        if(size === 1) {
            console.log('A 1x1 magic square solution is trivial.')
        }
        if(size === 2) {
            console.log('There are no 2x2 magic square solutions.');
        }
        if(size > 2) {
            //check that the series is the correct length to fit in the square
            //create array to store the series
            var series = [];
            //fill the array
            for (var i = start; i <= end; i++) {
                series.push(i);
            }
            var seriesLength = series.length;
            var squareCells = size * size;

            if (seriesLength !== squareCells) {
                console.log('The series you entered does not fit into the magic square you specified');
            }
            else {
                //now check what the magic number is for this square
                //first sum series
                var sum = series.reduce(function(previous, current) {return previous + current});
                //then check whether the sum is divisible by the size of the square
                var magicNumber = sum/size;
                console.log('The magic number for this square is', magicNumber);
                //now get all the array indices that need to be checked for this size of magic square
                var rowIndices = calculate.rowIndices(size, series);
                var columnIndices = calculate.columnIndices(size, series);
                var ltrIndices = calculate.ltrIndices(size, series);
                var rtlIndices = calculate.rtlIndices(size, series);

                // console.log(rowIndices, columnIndices, ltrIndices, rtlIndices);


                //now get all the permutations of the input series, this takes ages,
                //so use a promise to halt program execution until it is complete
                permutate(series).then(function(permArray) {
                    var failCount = 0;
                    permArray.forEach(function(permutation) {
                        //now we can check for magic square properties
                        //test rows
                        var rowCounter = 0;
                        rowIndices.forEach(function(arr) {
                            var sum = 0;
                            arr.forEach(function(index) {
                                sum += permutation[index-1];
                            });
                            if (sum === magicNumber) {
                                rowCounter++;
                            }
                            if (rowCounter === size) {
                                //for those permutations that pass the row test, test columns
                                var columnCounter = 0;
                                columnIndices.forEach(function(arr) {
                                    var sum = 0;
                                    arr.forEach(function(index) {
                                        sum += permutation[index-1];
                                    });
                                    if (sum === magicNumber) {
                                        columnCounter++;
                                    }
                                    if (columnCounter === size) {
                                        //for those permutations that pass the row and column test, test ltr diagonal
                                        var sum = 0;
                                        ltrIndices.forEach(function(index) {
                                            sum += permutation[index-1];
                                        });
                                        if (sum === magicNumber) {
                                            //for those permuations that pass the row, column and ltr diagonal test, test rtl diagonal
                                            var sum = 0;
                                            rtlIndices.forEach(function(index) {
                                                sum +=permutation[index-1];
                                            });
                                            if (sum === magicNumber) {
                                                //all permutations that pass all tests are by definition magic squares
                                                console.log('Magic Square =', permutation);
                                            }
                                            else {
                                                failCount++;
                                            }
                                        }
                                        else {
                                            failCount++;
                                        }
                                    }
                                    else {
                                        failCount++;
                                    }
                                });
                            }
                            else {
                                failCount++
                            }
                        });
                    });
                    // console.log('failCount=', failCount);
                    // console.log('permArray.length=', permArray.length);
                    if (failCount === permArray.length * size) {
                        console.log('There are no magic squares for this series');
                    }
                });
            }
        }
    });


