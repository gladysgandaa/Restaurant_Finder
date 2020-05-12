const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//onCall to call functions from FrontEnd
exports.addAdminRole = functions.https.onCall((data, context) => {
    //Get user and add custom calim (admin)
    return admin.auth().getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            });
        })
        .then(() => {
            return {
                message: `Success ${data.email} has been made an admin`
            }
        })
        .catch(err => {
            return err;
        });
});