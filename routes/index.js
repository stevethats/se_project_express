const router = require("express").Router();
const { NOT_FOUND, NOT_FOUND_MESSAGE } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send(NOT_FOUND_MESSAGE);
});

module.exports = router;
