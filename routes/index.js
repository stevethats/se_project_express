const router = require("express").Router();
const { NotFoundError } = require("../utils/errors/not-found");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use(() => {
  throw new NotFoundError("User not found.");
});

module.exports = router;
