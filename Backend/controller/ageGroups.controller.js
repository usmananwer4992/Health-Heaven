const AgeGoupService = require("../services/ageGoup.service");
const ResponseFormatService = require("../services/responseFormat.service");

createAgeGroup = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("Content can not be empty!");
    }

    const form = {
      name: req.body.name,
    };

    const existingForm = await AgeGoupService.findByName(
      form.name.toUpperCase()
    );
    if (existingForm) {
      throw new Error(
        `Age Group with this name: ${form.name.toUpperCase()} already exists`
      );
    }

    const createdForm = await AgeGoupService.createAgeGroup(form);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { ageGroup: createdForm },
          "Age Group created successfully!",
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
          e.message || "Something went wrong while creating the Age Group!",
          false
        )
      );
  }
};

allAgeGroup = async (req, res) => {
  try {
    const ageGroups = await AgeGoupService.findAllAgeGroups(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { ageGroups },
          "Age Groups fetched successfully!",
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
          e.message || "Some error occurred while fetching Age Groups",
          false
        )
      );
  }
};

findAgeGroup = async (req, res) => {
  const id = req.params.id;
  try {
    const form = await AgeGoupService.findById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugForms: form },
          "Age Groups fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the age groups",
          false
        )
      );
  }
};

deleteAgeGroup = async (req, res) => {
  const id = req.params.id;
  try {
    const form = await AgeGoupService.softDelete(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugForm: form },
          "Age Group deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the Age Group",
          false
        )
      );
  }
};

updateAgeGroup = async (req, res) => {
  const id = req.params.id;

  const drugForm = {
    name: req.body?.name,
  };

  try {
    const existingDrugForm = await AgeGoupService.findById(id);
    if (!existingDrugForm) {
      throw new Error(`Age Group with id: ${id} not found`);
    }

    const existingDrugFormName = await AgeGoupService.findByName(
      drugForm.name.toUpperCase()
    );
    if (existingDrugFormName) {
      throw new Error(
        `Age Group with this name: ${drugForm.name} already exists, cannot update with this name`
      );
    }
    const updatedDrugForm = await AgeGoupService.update(drugForm, id);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { ageGroup: updatedDrugForm },
          "Age Group updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the Age Group!",
          false
        )
      );
  }
};

module.exports = {
  createAgeGroup,
  allAgeGroup,
  findAgeGroup,
  deleteAgeGroup,
  updateAgeGroup,
};
