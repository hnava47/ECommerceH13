const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [Product]
    });

    res.status(200).json(allTags);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;

  try {
    const tag = await Tag.findByPk(id, {
      include: [Product]
    });

    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;

  try {
    const createTag = await Tag.create({
      tag_name
    });

    res.status(200).json(createTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;

  try {
    await Tag.update(req.body,
      {
        where: { id }
      }
    );

    const updatedTag = await Tag.findByPk(id, {
      include: [Product]
    });

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;

  try {
    const deletedTag = await Tag.findByPk(id, {
      include: [Product]
    });
    await Tag.destroy({
      where: { id }
    });

    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
