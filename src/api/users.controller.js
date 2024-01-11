import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async apiPostUser(req, res, next) {
        try{
            const firebaseUid = req.body.firebaseUid;
            const username = req.body.username;
            const name = req.body.name;
            const email = req.body.email;
            const createdAt = new Date();

            const userResponse = await UsersDAO.addUser(firebaseUid, username, name, email, createdAt);
            if (userResponse && userResponse.firebaseUid) {
                res.json({ status: "success "});
            } else {
                throw new Error("Error adding user");
            }

        } catch(e) {
            res.status(500).json({ error: "Error adding user"});
        }
    }

    static async apiUpdateUser(req, res, next) {
        try{
            const firebaseUid = req.body.firebaseUid;
            const username = req.body.username;
            const name = req.body.name;
            const email = req.body.email;
            
            const updatedRowCount = await UsersDAO.updateUser(firebaseUid, username, name, email);

            if (updatedRowCount === 0) {
                throw new Error("Unable to update user - user may not be original user");
            }
        
            res.json({ status: "success" });

        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteUser(req, res, next) {
        try{
            const firebaseUid = req.body.firebaseUid;
            
            const deletedRowCount = await UsersDAO.deleteUser(firebaseUid);

            if (deletedRowCount === 0) {
                throw new Error("Unable to delete user or user not found");
              }
        
              res.json({ status: "success" });

        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }
}
