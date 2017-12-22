/**
 * This file contains the constant strings to be used in the code logic to allow for easy editing
 * Below are eslint comments to enforce JSON like syntax since strings are usually stored in JSON
 * They are written in JavaScript for easier organization of the data and in case functions are used
 */

/* eslint quote-props: ["error", "always"] */
/* eslint quotes: ["error", "double"] */

// eslint-disable-next-line quotes
const deepFreeze = require('deep-freeze');

const intervalName = [
    "perfect unison",
    "minor second",
    "major second",
    "minor third",
    "major third",
    "perfect fourth",
    "tritone",
    "perfect fifth",
    "minor sixth",
    "major sixth",
    "minor seventh",
    "major seventh",
    "perfect octave",
    "minor ninth",
    "major ninth",
    "minor tenth",
    "major tenth",
    "perfect eleventh",
    "augmented eleventh",
    "perfect twelfth",
    "minor thirteenth",
    "major thirteenth",
    "minor fourteenth",
    "major fourteenth",
    "two octaves",
];

const semitonesOf = {
    "perfect unison": 0,
    "minor second": 1,
    "major second": 2,
    "minor third": 3,
    "major third": 4,
    "perfect fourth": 5,
    "tritone": 6,
    "perfect fifth": 7,
    "minor sixth": 8,
    "major sixth": 9,
    "minor seventh": 10,
    "major seventh": 11,
    "perfect octave": 12,
    "minor ninth": 13,
    "major ninth": 14,
    "minor tenth": 15,
    "major tenth": 16,
    "perfect eleventh": 17,
    "augmented eleventh": 18,
    "perfect twelfth": 19,
    "minor thirteenth": 20,
    "major thirteenth": 21,
    "minor fourteenth": 22,
    "major fourteenth": 23,
    "two octaves": 24,
};

const notes = [
    "A0", "Bb0", "B0",
    "C1", "Db1", "D1", "Eb1", "E1", "F1", "Gb1", "G1", "Ab1", "A1", "Bb1", "B1",
    "C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2",
    "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
    "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
    "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5",
    "C6", "Db6", "D6", "Eb6", "E6", "F6", "Gb6", "G6", "Ab6", "A6", "Bb6", "B6",
    "C7", "Db7", "D7", "Eb7", "E7", "F7", "Gb7", "G7", "Ab7", "A7", "Bb7", "B7",
    "C8",
];

const general = {
    START: "Ok, let's go!",
    WRONG: "Not quite - try again",
    CORRECT: "That's correct!",
    NEXT: "Let's try another one.",
    REVEAL: "The answer was:",
    GUESS: "What's your guess?",
}

// Use deepFreeze to make the constant objects immutable so they are not unintentionally modified
module.exports = deepFreeze({
    intervalName,
    semitonesOf,
    notes,
    general,
});