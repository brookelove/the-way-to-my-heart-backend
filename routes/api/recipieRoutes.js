const router = require("express").Router();
const { Project, Recipie } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newRecipie = await Recipie.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipie);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Recipie.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const recipieData = await Recipie.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipieData) {
      res.status(404).json({ message: "No Recipie found with this id!" });
      return;
    }

    res.status(200).json(recipieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
