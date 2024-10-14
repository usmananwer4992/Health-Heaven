const DrugCategoryService = require("../services/drugCategory.service");
const ResponseFormatService = require("../services/responseFormat.service");

create = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("Content can not be empty!");
    }

    const category = {
      name: req.body.name,
    };

    const existingCategory = await DrugCategoryService.findDrugCategoryByName(
      category.name.toUpperCase()
    );
    if (existingCategory) {
      throw new Error(
        `Category with this name: ${category.name.toUpperCase()} already exists`
      );
    }

    const createdCategory = await DrugCategoryService.createDrugCategory(
      category
    );

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { category: createdCategory },
          "Category created successfully!",
          true
        )
      );
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while creating the category!",
          false
        )
      );
  }
};

all = async (req, res) => {
  try {
    const categories = await DrugCategoryService.findAllDrugCategories(req);
    const totalCount = await DrugCategoryService.totalCount(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { categories, totalCount },
          "Categories fetched successfully!",
          true
        )
      );
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching categories",
          false
        )
      );
  }
};

find = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await DrugCategoryService.findDrugCategoryById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { category: category },
          "Category fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the category",
          false
        )
      );
  }
};

deleteDrugCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await DrugCategoryService.softDeleteCategory(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { category: category },
          "Category deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the category",
          false
        )
      );
  }
};

update = async (req, res) => {
  const id = req.params.id;

  const category = {
    name: req.body?.name,
  };

  try {
    const existingCategory = await DrugCategoryService.findDrugCategoryById(id);
    if (!existingCategory) {
      throw new Error(`Category with id: ${id} not found`);
    }

    const existingCategoryName =
      await DrugCategoryService.findDrugCategoryByName(
        category.name.toUpperCase()
      );
    if (existingCategoryName) {
      throw new Error(
        `Category with this name: ${category.name} already exists, cannot update with this name`
      );
    }
    const updatedCategory = await DrugCategoryService.updateDrugCategory(
      category,
      id
    );

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { category: updatedCategory },
          "Category updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the category!",
          false
        )
      );
  }
};

module.exports = {
  create,
  all,
  find,
  deleteDrugCategory,
  update,
};
