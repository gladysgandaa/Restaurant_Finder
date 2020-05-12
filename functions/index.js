const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//onCall to call functions from FrontEnd
exports.addAdminRole = functions.https.onCall((data, context) => {

    //Check request is made by an ADMIN
    if(context.auth.token.admin !== true){
        return{error: 'Only admin can add other admin. Nice Try'}
    }
    
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


/*------------------------------------------------------------
1. npm install firebase-tools -g 
2. firebase login
3. firebase init functions
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

Steps to deploy
firebase deploy --only functions*/