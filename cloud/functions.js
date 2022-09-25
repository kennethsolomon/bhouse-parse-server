Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('countRoom', async (request) => {
    const query = new Parse.Query('boarder')
    // Use Session Token to Authenticate User
    // const result = await query.find({sessionToken: request.user.getSessionToken()})

    const pipeline = [
        {
          '$group': {
            '_id': '$_p_roomPointer',
            'count': {
              '$count': {}
            }
          }
        }
      ];

      return query.aggregate(pipeline)
        .then(function (results) {
          return results;
        })
        .catch(function (error) {
          throw error;
        });
});


Parse.Cloud.define('users', req => {
  const query = new Parse.Query(Parse.User);
  // query.equalTo("objectId", "lltcILRljN")
  // query.get()

  // return query
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});
