import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // ... other configuration
});

// Firebase authentication middleware
const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(403).send('Unauthorized');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Add the user info to the request object
        next(); // Proceed to the next middleware/function
    } catch (error) {
        res.status(403).send('Invalid token');
    }
};

export default authenticateUser;