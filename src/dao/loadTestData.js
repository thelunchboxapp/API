const users = await User.bulkCreate([
    { firebaseUid: '1', username: 'Jack Sparrow', email: 'jack@gmail.com' },
    { firebaseUid: '2', username: 'Tanish', email: 'tanish@gmail.com' },
    { firebaseUid: '3', username: 'Caroline', email: 'caroak@gmail.com' }
  ]);