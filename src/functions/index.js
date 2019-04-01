import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp();

const message = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`from Babelified Cloud Functions!`);
    }, 5000);
  });
};

export let helloWorld = functions.https.onRequest(async (req, res) => {
  let world = await message();
  res.status(200).send(`Hello ${world}`);
});
