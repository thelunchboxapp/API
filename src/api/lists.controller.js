import ListsDAO from "../dao/listsDAO.js";

export default class ListsController {

  static async apiGetList(req, res, next) {
    try {
      let id = req.body.list_id || {};
      console.log(id)
      let list = await ListsDAO.getList(id);
      if (!list) {
        res.status(404).json({ error: "List Not found" });
        return;
      }
      res.json(list);
    } catch(e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetListsByUserId(req, res, next) {
    try {
      let userid = req.params.id || {};
      let list = await ListsDAO.getListsByUserId(userid);
      if (!list) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(list);
    } catch(e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostList(req, res, next) {
    try {
      const userId = req.body.firebaseUid;
      console.log(userId)
      const description = req.body.description;
      const date = new Date();

      const listResponse = await ListsDAO.addList(userId, description, date);
      if (listResponse && listResponse.listid) {
        res.json({ status: "success" });
      } else {
          throw new Error("Error adding list");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateList(req, res, next) {
    try {
      const listId = req.body.list_id;
      const userId = req.body.firebaseUid;
      const description = req.body.description;
      const date = new Date();

      const updatedRowCount = await ListsDAO.updateList(listId, userId, description, date);

      if (updatedRowCount === 0) {
        throw new Error("Unable to update list - user may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteList(req, res, next) {
    try {
      const listId = req.body.list_id;
      const userId = req.body.firebaseUid;

      const deletedRowCount = await ListsDAO.deleteList(listId, userId);

      if (deletedRowCount === 0) {
        throw new Error("Unable to delete list or list not found");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPostListItem(req, res, next) {
    try {
      const listId = req.body.list_id;
      const restaurantId = req.body.restaurant_id;
      const date = new Date();

      const listItemResponse = await ListsDAO.addListItem(listId, restaurantId, date);

      if (listItemResponse && listItemResponse.listitemid) {
        res.json({ status: "success" });
      } else {
        throw new Error("Error adding list item");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteListItem(req, res, next) {
    try {
      const listId = req.body.list_id;
      const restaurantId = req.body.restaurant_id;

      const deletedRowCount = await ListsDAO.deleteListItem(listId, restaurantId);

      if (deletedRowCount === 0) {
        throw new Error("Unable to delete list item");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
