const drugTypeService = require("../services/drugType.service");
const ResponseFormatService = require("../services/responseFormat.service");

create = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("Content can not be empty!");
    }

    const drugType = {
      name: req.body.name,
    };

    const existingDrugType = await drugTypeService.findDrugTypeByName(
      drugType.name.toUpperCase()
    );
    if (existingDrugType) {
      throw new Error(
        `Drug Type with this name: ${drugType.name.toUpperCase()} already exists`
      );
    }

    const createdDrugType = await drugTypeService.createDrugType(drugType);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugType: createdDrugType },
          "Drug Type created successfully!",
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
          e.message || "Something went wrong while creating the drug type!",
          false
        )
      );
  }
};

all = async (req, res) => {
  try {
    const drugTypes = await drugTypeService.findAllDrugTypes(req);
    const totalCount = await drugTypeService.totalCount(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugTypes, totalCount },
          "Drug Types fetched successfully!",
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
          e.message || "Some error occurred while fetching drug types",
          false
        )
      );
  }
};

find = async (req, res) => {
  const id = req.params.id;
  try {
    const drugType = await drugTypeService.findDrugTypeById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugTypes: drugType },
          "Drug Types fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the drug type",
          false
        )
      );
  }
};

deleteDrugType = async (req, res) => {
  const id = req.params.id;
  try {
    const drugType = await drugTypeService.softDeleteDrugType(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugType: drugType },
          "Drug type deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the drug type",
          false
        )
      );
  }
};

update = async (req, res) => {
  const id = req.params.id;

  const drugType = {
    name: req.body?.name,
  };

  try {
    const existingDrugType = await drugTypeService.findDrugTypeById(id);
    if (!existingDrugType) {
      throw new Error(`Drug type with id: ${id} not found`);
    }

    const existingDrugTypeName = await drugTypeService.findDrugTypeByName(
      drugType.name.toUpperCase()
    );
    if (existingDrugTypeName) {
      throw new Error(
        `Drug Type with this name: ${drugType.name} already exists, cannot update with this name`
      );
    }
    const updatedDrugType = await drugTypeService.updateDrugType(drugType, id);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugType: updatedDrugType },
          "Drug Type updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the drug type!",
          false
        )
      );
  }
};

module.exports = {
  create,
  all,
  find,
  deleteDrugType,
  update,
};
