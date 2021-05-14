const { google } = require('googleapis');

const resolvers = {
    Query: {
        getEventList: async (_, { eventListParam }) => {
            //discoveryDoc
            const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
            // Setup My API Client
            const oAuthClient = new google.auth.OAuth2({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                redirectUri: process.env.REDIRECT_URIS,
            });
            const credentials = {
                access_token:
                    'ya29.a0AfH6SMBEZKmTWwGUVdYrh0GozIamETcDNUusF9hy0C8ceXjqyMLk0AMzCiOmczLj3rsuQvw1c7Alhd5GZaiIyE5sgl8kQ89lYPr_i7_yAG97Va5BssdOUX5Vnyp9C5aG_dGCK_4gL3EG7LtLern2tWN9EmGD',
                scope: SCOPES[0],
            };
            oAuthClient.setCredentials(credentials);

            return new Promise((resolve, reject) => {
                let calendar = google.calendar({ version: 'v3', auth: oAuthClient });
                calendar.events.list(eventListParam, (err, res) => {
                    if (err) reject(err);
                    return resolve(res);
                });
            })
                .then((result) => {
                    console.log(JSON.stringify(result.data, null, 2));
                    return result.data;
                })
                .catch((err) => {
                    console.log('err', err.response.data);
                    return err;
                });
        },
    },
};

module.exports = resolvers;
