import ListsDAO from "../dao/listsDAO.js";

export default class ListsController {

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
      const restaurantId = req.body.restaurant_id;
      const userId = req.body.user_id;
      const cuisine = req.body.cuisine;
      const priority = req.body.priority;
      const date = new Date();

      const listResponse = await ListsDAO.addList(restaurantId, userId, cuisine, priority, date);
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
      const userId = req.body.user_id;
      const restaurantId = req.body.restaurant_id;
      const cuisine = req.body.cuisine;
      const priority = req.body.priority;
      const date = new Date();

      const updatedRowCount = await ListsDAO.updateList(listId, userId, restaurantId, cuisine, priority, date);

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
      const userId = req.body.user_id;

      const deletedRowCount = await ListsDAO.deleteList(listId, userId);

      if (deletedRowCount === 0) {
        throw new Error("Unable to delete list or list not found");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
