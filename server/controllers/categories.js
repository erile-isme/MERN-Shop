import Category from '../models/categoryModel.js';

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createCategory = async (req, res) => {
  const cate = req.body;
  const newCate = new Category(cate);

  try {
    await newCate.save();
    res.status(201).json(newCate);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
