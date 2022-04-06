const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [Product]
    });

    res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id, {
      include: [Product]
    });

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;

  try {
    const createCategory = await Category.create({
      category_name
    });

    res.status(200).json(createCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;

  try {
    await Category.update(req.body, {
      where: { id }
    });

    const updatedCategory = await Category.findByPk(id, {
      include: [Product]
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByPk(id, {
      include: [Product]
    });
    await Category.destroy({
      where: { id }
    });

    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
