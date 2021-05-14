const { google } = require('googleapis');

const resolvers = {
    Query: {
        getCalendarList: async () => {
            const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
            // Setup My API Client
            const oAuthClient = new google.auth.OAuth2({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                redirectUri: process.env.REDIRECT_URIS,
            });

            // Set Client credentials
            const credentials = {};
            oAuthClient.setCredentials(credentials);

            return new Promise((resolve, reject) => {
                let calendar = google.calendar({ version: 'v3', auth: oAuthClient });
                calendar.calendarList.list({}, (err, res) => {
                    if (err) reject(err);
                    return resolve(res);
                });
            })
                .then((result) => result.data)
                .catch((err) => err);
        },
    },
};

module.exports = resolvers;
