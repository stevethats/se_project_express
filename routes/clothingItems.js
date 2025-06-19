const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");
const {
  validateCardBody,
  validateURLParameters,
} = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, validateCardBody, createClothingItem);
router.delete("/:itemId", auth, validateURLParameters, deleteClothingItem);
router.put("/:itemId/likes", auth, validateURLParameters, likeClothingItem);
router.delete(
  "/:itemId/likes",
  auth,
  validateURLParameters,
  unlikeClothingItem
);

module.exports = router;
