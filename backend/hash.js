const bcrypt = require('bcryptjs');
const password = 'admin123'; // The password you want to use
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('COPY THIS HASH:');
    console.log(hash);
});

