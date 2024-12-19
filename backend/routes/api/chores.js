const express = require("express");
const { Op } = require("sequelize");
const { Chore, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

//GET All chores
router.get("/", requireAuth, async (req, res) => {
  const Chores = [];
  let chores = await Chore.findAll({
    raw: true,
    include: {
      model: User,
    },
  });

  for (let i = 0; i < chores.length; i++) {
    let chore = chores[i];
    console.log(chore["User.id"]);
    let choreResult = {
      id: chore.id,
      ownerId: chore.ownerId,
      name: chore.name,
      dueDate: chore.dueDate,
      isCompleted: !!chore.isCompleted,
    };

    if (chore.assignedTo === chore["User.id"]) {
      choreResult.assignedTo = {
        id: chore["User.id"],
        firstName: chore["User.firstName"],
        lastName: chore["User.lastName"],
      };
    }
    Chores.push(choreResult);
  }

  return res.status(200).json({ Chores });
});

//POST Add a chore
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  const { name, dueDate, assignedTo, isCompleted } = req.body;

  const newChore = await Chore.create({
    ownerId: parseInt(user.id),
    name,
    dueDate,
    assignedTo,
    isCompleted,
  });

  const newChoreData = newChore.get({ plain: true });

  return res.status(201).json({ ...newChoreData });
});

//PATCH Edit chore details
router.patch("/:choreId", requireAuth, async (req, res) => {
  //   const { user } = req;
  const { choreId } = req.params;
  const { name, dueDate, assignedTo, isCompleted } = req.body;

  //   console.log(choreId)

  const chore = await Chore.findByPk(parseInt(choreId));

  if (!chore) {
    res.status(404);
    return res.json({ message: "Chore couldn't be found" });
  }

  const updateChore = await chore.update({
    id: choreId,
    name,
    dueDate,
    assignedTo,
    isCompleted,
  });

  return res.status(200).json(updateChore);
});

//DELETE a chore
router.delete("/:choreId", requireAuth, async (req, res) => {
  const { user } = req;
  const { choreId } = req.params;
  const chore = await Chore.findOne({ where: { id: choreId } });
  // console.log(spot)

  if (!chore) {
    res.status(404);
    return res.json({ message: "Chore couldn't be found" });
  }

  await chore.destroy();
  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
