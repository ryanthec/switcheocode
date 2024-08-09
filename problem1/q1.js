

var sum_to_n_a = function(n) {

    let count = 0;
    for(let i=1; i<=n ; i++)
    {
        count += i;
    }
    return count;

};

var sum_to_n_b = function(n) {

    return (n * (n+1))/2;

};

var sum_to_n_c = function(n) {
    
    if(n==1)
    {
        return 1;
    }
    
    return n + sum_to_n_c(n-1);
};


//Code to test my implementation
let result = sum_to_n_a(5);
console.log("Sum of numbers is: " + result);

let result2 = sum_to_n_b(5);
console.log("Sum of numbers is: " + result2);

let result3 = sum_to_n_c(5);
console.log("Sum of numbers is: " + result3);