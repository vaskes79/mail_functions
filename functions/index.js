const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addClient = functions.https.onRequest((req, res) => {
  const client = {
    name: req.query.name,
    email: req.query.email,
    size: req.query.size,
    referer: req.get('Referer'),
  };

  return admin
    .database()
    .ref('/clients')
    .push(client)
    .then(snapshot => {
      let key = snapshot.key;
      snapshot.update({
        id: key,
      });
      return res.redirect(303, req.get('Referer') + '#book');
    });
});

exports.sendMail = functions.database
  .ref('/clients/{pushId}')
  .onCreate((snapshot, context) => {
    const client = snapshot.val();
    console.log('id', context.params.pushId);
    console.log('client', client);
  });
