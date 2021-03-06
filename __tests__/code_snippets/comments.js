/* eslint-disable */

// input: trailing line comments
// config: {"max-len": 20}
let a; // stuff
const b = {
    a: 5, // yo
    b: 0 // yo yo yo
}; // lol
// end
// output:
let a; // stuff
const b = {
    a: 5, // yo
    b: 0 // yo yo yo
}; // lol
// end

// input: leading line comments
// config: {"max-len": 15}
// yo yo yo
function abc() {
    // dude
    return b;
}

// lol
var obj = {
    // property
    a: b
};
// output:
// yo yo yo
function abc() {
    // dude
    return b;
}

// lol
var obj = {
    // property
    a: b
};


// input: block comments
// config: {"max-len": 15}
/*
abc
*/
function a() {
    /* abc */
    return {
        /* bc
         * e
         */
         a: 5
         /* b
         */
    } /* abc */
    /*ced*/
} /* a */
/* b */
// output:
/*
abc
*/
function a() {
    /* abc */
    return {
        /* bc
         * e
         */
        a: 5
        /* b
         */
    };
    /* abc */
    /*ced*/
} /* a */
/* b */


// input: mixed comments
/* abc */
/// abc
function a() {
    // re
    /* er */
    return b;
} // b
/* c */

// output:
/* abc */
/// abc
function a() {
    // re
    /* er */
    return b;
} // b
/* c */

// input: in classes
// skip
/* abc */
class A { // cde
    /* abc */
    constructor() { // d
        super(); // a
    } // l

    // oeu
    method() {
        return 5; // b
    } // abc
    // cde
} // ath
// oeu
// output:
/* abc */
class A { // cde
    /* abc */
    constructor() { // d
        super(); // a
    } // l

    // oeu
    method() {
        return 5; // b
    } // abc
    // cde
} // ath
// oeu

// input: in arrays
[a, /* b */ c /* d */]; // abc
// output:
[a, /* b */ c /* d */]; // abc

// input: in function argument list
function a(a, /* b */ c /* rest */) {}
a(a, /* b */ c /* rest */);
// output:
function a(a, /* b */ c /* rest */) {}

a(a, /* b */ c /* rest */);

// input: in objects
// config: {"max-len": 20}
let a = {
    /* b */
    a: function() {}, // cde
    // abc
    b: 'test test test' // abc
    // a
}; // a
// b
// output:
let a = {
    /* b */
    a: function() {}, // cde
    // abc
    b: 'test test test' // abc
    // a
}; // a
// b

// input: trailing comment on the first line
// config: {"max-len": 10}
const a = { // abc
    b
};
const b = { /* a */ /* b */ // c
    a
};
// output:
const a = { // abc
    b
};
const b = { /* a */ /* b */ // c
    a
};

// input: trailing comment on the last line without ';'
// skip
const a = {
    b
} // a
// b
// output:
const a = {
    b
}; // a
// b

// input: in variable declaration blocks
// aaaa
let a = 5, // acb
    // aaa
    b = 5; // ddd
// output:
// aaaa
let a = 5, // acb
    // aaa
    b = 5; // ddd

// input: in multiline arrays
// config: {"max-len": 5}
let a = [ // bbb
    1, // cccc
    2, // ddd
    /* 234'4 */
    3
    // abc
]; // 999
// 888
// output:
let a = [ // bbb
    1, // cccc
    2, // ddd
    /* 234'4 */
    3
    // abc
]; // 999
// 888

// input: in block body
// skip
function FluxContext(app) {
    // To be created on demand
    this._dispatcher = null;
}
// output:
function FluxContext(app) {
    // To be created on demand
    this._dispatcher = null;
}
