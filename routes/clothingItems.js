const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  updateClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

//GET all clothing items
router.get("/", getClothingItems);
//CREATE clothing item
router.post("/", createClothingItem);
//DELETE item by ID
router.delete("/:itemId", deleteClothingItem);
//UPDATE item by ID
router.put("/:itemId", updateClothingItem);
//Like clothing item
router.put("/:itemId/likes", likeClothingItem);
//Unlike clothing item
router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
