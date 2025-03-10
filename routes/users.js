const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/users");

//GET all users
router.get("/", getUsers);
//GET user by ID
router.get("/:userId", getUser);
//CREATE user
router.post("/", createUser);
//UPDATE user by ID
router.put("/:userId", updateUser);

module.exports = router;
