const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [Product]
    });

    res.json(allTags);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;

  try {
    const tag = await Tag.findByPk(id, {
      include: [Product]
    });

    res.json(tag);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  const { tag_name } = req.body;

  try {
    const createTag = await Tag.create({
      tag_name
    });

    res.json(createTag);
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  const { tag_name } = req.body;

  try {
    const updatedTag = await Tag.update(
      tag_name,
      {
        where: id
      }
    );

    req.json(updatedTag);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;

  try {
    const deletedTag = await Tag.findByPk(id, {
      include: [Product]
    });
    await Tag.destroy({
      where: id
    });

    res.json(deletedTag);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
