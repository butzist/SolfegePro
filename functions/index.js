'use strict';

const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

const strings = require('./strings');

process.env.DEBUG = 'actions-on-google:*';

/** Dialogflow Actions {@link https://dialogflow.com/docs/actions-and-parameters#actions} */
const Actions = {
    INTERVALS_NEW: 'intervals',
    INTERVALS_GUESS: 'intervals.guess',
    INTERVALS_REPEAT: 'intervals.repeat',
    INTERVALS_REVEAL: 'intervals.reveal',
};

/** Dialogflow Parameters {@link https://dialogflow.com/docs/actions-and-parameters#parameters} */
const Parameters = {
    GUESSED: 'guessed',
};

/** Dialogflow Contexts {@link https://dialogflow.com/docs/contexts} */
const Contexts = {
    INTERVALS: 'intervals'
};

/** Dialogflow Context Lifespans {@link https://dialogflow.com/docs/contexts#lifespan} */
const Lifespans = {
    DEFAULT: 5,
    END: 0
};

const Notes = {
    FROM: 20,
    TO: strings.notes.length - 15,
    MAX_INTERVAL: 12
}

const newInterval = app => {
    let response = app.buildRichResponse()
        .addSimpleResponse(`<speak>${strings.general.START}</speak>`);
    askNewInterval(app, response);
};

function askInterval(app, response) {
    let note1 = strings.notes[app.data.lower];
    let note2 = strings.notes[app.data.lower + app.data.interval];

    app.setContext(Contexts.INTERVALS, Lifespans.DEFAULT, {});

    const richResponse = app.buildRichResponse(response)
        .addSimpleResponse(`<speak>
  <par>
    <media begin="0s">
      <audio src="https://solfegepro.firebaseapp.com/piano/Piano.ff.${note1}.ogg"></audio>
    </media>
    <media begin="0s">
      <audio src="https://solfegepro.firebaseapp.com/piano/Piano.ff.${note2}.ogg"></audio>
    </media>
    <media begin="4s">
      <speak>${strings.general.GUESS}</speak>
    </media>
  </par>
</speak>`);

    app.ask(richResponse)
}

function askNewInterval(app, response) {
    let interval = Math.floor(Math.random() * (Notes.MAX_INTERVAL + 1));
    let lower = Notes.FROM + Math.floor(Math.random() * (Notes.TO - Notes.FROM - interval));

    app.data.lower = lower;
    app.data.interval = interval;

    askInterval(app, response);
}

const repeatInterval = app => {
    let response = app.buildRichResponse();
    askInterval(app, response);
};

const revealInterval = app => {
    let interval = strings.intervalName[app.data.interval];
    let response = app.buildRichResponse()
        .addSimpleResponse(`<speak>${strings.general.REVEAL} ${interval}. ${strings.general.NEXT}</speak>`);
    askNewInterval(app, response);
};

const guessInterval = app => {
    let guessed = app.getArgument(Parameters.GUESSED);

    if (guessed === strings.intervalName[app.data.interval]) {
        let response = app.buildRichResponse()
            .addSimpleResponse(`<speak>${strings.general.CORRECT} ${strings.general.NEXT}</speak>`);

        askNewInterval(app, response);
    } else {
        let response = app.buildRichResponse()
            .addSimpleResponse(`<speak>${strings.general.WRONG}</speak>`);

        askInterval(app, response);
    }
};

/** @type {Map<string, function(DialogflowApp): void>} */
const actionMap = new Map();
actionMap.set(Actions.INTERVALS_NEW, newInterval);
actionMap.set(Actions.INTERVALS_GUESS, guessInterval);
actionMap.set(Actions.INTERVALS_REPEAT, repeatInterval);
actionMap.set(Actions.INTERVALS_REVEAL, revealInterval);


/**
 * The entry point to handle a http request
 * @param {Request} request An Express like Request object of the HTTP request
 * @param {Response} response An Express like Response object to send back data
 */
const intervals = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({ request, response });
    console.log(`Request headers: ${JSON.stringify(request.headers)}`);
    console.log(`Request body: ${JSON.stringify(request.body)}`);
    app.handleRequest(actionMap);
});

module.exports = {
    intervals
};
