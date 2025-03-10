const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  updateClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId", updateClothingItem);
router.put("/:itemId/likes", likeClothingItem);
router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
