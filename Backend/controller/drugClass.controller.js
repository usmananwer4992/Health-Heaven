const DrugClassService = require("../services/drugClass.service");
const ResponseFormatService = require("../services/responseFormat.service");

create = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("Content can not be empty!");
    }

    const DrugClass = {
      name: req.body.name,
    };

    const existingdrugClass = await DrugClassService.findDrugClassByName(
      DrugClass.name.toUpperCase()
    );
    if (existingdrugClass) {
      throw new Error(
        `drugClass with this name: ${DrugClass.name.toUpperCase()} already exists`
      );
    }

    const createddrugClass = await DrugClassService.createDrugClass(DrugClass);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugClass: createddrugClass },
          "drugClass created successfully!",
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
          e.message || "Something went wrong while creating the drugClass!",
          false
        )
      );
  }
};

all = async (req, res) => {
  try {
    const drugClasses = await DrugClassService.findAllDrugClasses(req);
    const totalCount = await DrugClassService.totalCount(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugClasses, totalCount },
          "Classes fetched successfully!",
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
          e.message || "Some error occurred while fetching classes",
          false
        )
      );
  }
};

find = async (req, res) => {
  const id = req.params.id;
  try {
    const drugClass = await DrugClassService.findDrugClassById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugClass: drugClass },
          "drugClass fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the drugClass",
          false
        )
      );
  }
};

deleteDrugClass = async (req, res) => {
  const id = req.params.id;
  try {
    const drugClass = await DrugClassService.softDeleteClass(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugClass: drugClass },
          "drugClass deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the drugClass",
          false
        )
      );
  }
};

update = async (req, res) => {
  const id = req.params.id;

  const drugClass = {
    name: req.body?.name,
  };

  try {
    const existingDrugClass = await DrugClassService.findDrugClassById(id);
    if (!existingDrugClass) {
      throw new Error(`DrugClass with id: ${id} not found`);
    }

    const existingDrugClassName = await DrugClassService.findDrugClassByName(
      drugClass.name.toUpperCase()
    );
    if (existingDrugClassName) {
      throw new Error(
        `DrugClass with this name: ${drugClass.name} already exists, cannot update with this name`
      );
    }
    const updatedDrugClass = await DrugClassService.updateDrugClass(
      drugClass,
      id
    );

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { DrugClass: updatedDrugClass },
          "DrugClass updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the DrugClass!",
          false
        )
      );
  }
};

module.exports = {
  create,
  all,
  find,
  deleteDrugClass,
  update,
};
