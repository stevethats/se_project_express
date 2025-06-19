const router = require("express").Router();
const auth = require("../middlewares/auth");
const { updateProfile, getCurrentUser } = require("../controllers/users");
const { validateUpdateUserBody } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateUserBody, updateProfile);

module.exports = router;
