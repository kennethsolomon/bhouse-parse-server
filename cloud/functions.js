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

Parse.Cloud.define('chartPayment', async (request) => {
    const query = new Parse.Query('payment')
    // Use Session Token to Authenticate User
    // const result = await query.find({sessionToken: request.user.getSessionToken()})

    const pipeline = [
        {
          '$project': {
            'year': {
              '$year': '$date'
            },
            'month': {
              '$month': '$date'
            },
            'day': {
              '$dayOfMonth': '$date'
            },
            'date': 1,
            'price': 1,
          }
        }, {
          '$match': {
            'year': request.params.year
          }
        },
        {
          '$group': {
            '_id': '$month',
            'price': {'$sum' : '$price'},
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

Parse.Cloud.define('chartExpense', async (request) => {
    const query = new Parse.Query('expense')
    // Use Session Token to Authenticate User
    // const result = await query.find({sessionToken: request.user.getSessionToken()})

    const pipeline = [
        {
          '$project': {
            'year': {
              '$year': '$date'
            },
            'month': {
              '$month': '$date'
            },
            'day': {
              '$dayOfMonth': '$date'
            },
            'date': 1,
            'price': 1,
          }
        }, {
          '$match': {
            'year': request.params.year
          }
        },
        {
          '$group': {
            '_id': '$month',
            'price': {'$sum' : '$price'},
          }
        }
      ];

      console.log('clourd', query.aggregate(pipeline))
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
