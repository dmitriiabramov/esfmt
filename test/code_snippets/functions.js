/* eslint-disable */

// input: declaration
function a() {}
let a = function() {};
let a = () => {};
// output:
function a() {}

let a = function() {};
let a = () => {};

// input: generator function
// skip
function* a () {}
// output:
function* a () {}

// input: default parameters
// skip
function a(b = 5, c = null) {}
function b(c = 5, a = c) {}
// output:
function a(b = 5, c = null) {}
function b(c = 5, a = c) {}

// input: destructured default
// skip
function a([a, b] = [1, 2]) {};
// output:
function a([a, b] = [1, 2]) {};

// input: destructured arguments
// skip
function a({b, c}, [a, f, e]) {}
// output:
function a({b, c}, [a, f, e]) {}

// input: oneliner
a.map(b => b.a);
// output:
a.map((b) => b.a);

// input: self invoked anonymous function
// skip
(function() {})(null);
// output:
(function() {})(null);
