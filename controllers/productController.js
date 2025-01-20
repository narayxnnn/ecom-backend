import Product from "../models/productsModel.js";

export const getAllProducts = async (req, res) => {
  return res.json("hello world!");
};

export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const response = await Product.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return res.status(200).json({
      message: "Success",
      data: response,
      pagination: {
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.log("ERROR occurred in Getting Products", error);
    return res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    console.log("PRODUCT: ", product);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.log("ERROR occurred in Getting Product", error);
    return res.status(500).json({
      message: "Failed to get product",
      error: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  //   console.log(req.body);

  try {
    const newProduct = await Product.create(req.body);

    console.log(newProduct);

    return res.status(201).json({
      message: "Successfully Created",
      data: newProduct,
    });
  } catch (error) {
    console.log("ERROR occurred in Creating Products", error);
    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(204).json({
      message: "Product successfully removed",
    });
  } catch (error) {
    console.log("ERROR occured in removing product", error);
    return res.status(500).json({
      message: "Failed to remove product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Product successfully updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("ERROR occured in updating product", error);
    return res.status(500).json({
      massage: "Failed to update product",
    });
  }
};
