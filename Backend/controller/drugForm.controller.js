const DrugFormService = require("../services/drugForm.service");
const ResponseFormatService = require("../services/responseFormat.service");

create = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("Content can not be empty!");
    }

    const form = {
      name: req.body.name,
    };

    const existingForm = await DrugFormService.findDrugFormByName(
      form.name.toUpperCase()
    );
    if (existingForm) {
      throw new Error(
        `Form with this name: ${form.name.toUpperCase()} already exists`
      );
    }

    const createdForm = await DrugFormService.createDrugForm(form);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugForm: createdForm },
          "Drug Form created successfully!",
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
          e.message || "Something went wrong while creating the drug form!",
          false
        )
      );
  }
};

all = async (req, res) => {
  try {
    const drugForms = await DrugFormService.findAllDrugForms(req);
    const totalCount = await DrugFormService.totalCount(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugForms, totalCount },
          "Drug Forms fetched successfully!",
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
          e.message || "Some error occurred while fetching drug forms",
          false
        )
      );
  }
};

find = async (req, res) => {
  const id = req.params.id;
  try {
    const form = await DrugFormService.findDrugFormById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugForms: form },
          "Drug Forms fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the drug form",
          false
        )
      );
  }
};

deleteDrugForm = async (req, res) => {
  const id = req.params.id;
  try {
    const form = await DrugFormService.softDeleteForm(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugForm: form },
          "Drug form deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the drug form",
          false
        )
      );
  }
};

update = async (req, res) => {
  const id = req.params.id;

  const drugForm = {
    name: req.body?.name,
  };

  try {
    const existingDrugForm = await DrugFormService.findDrugFormById(id);
    if (!existingDrugForm) {
      throw new Error(`Drug form with id: ${id} not found`);
    }

    const existingDrugFormName = await DrugFormService.findDrugFormByName(
      drugForm.name.toUpperCase()
    );
    if (existingDrugFormName) {
      throw new Error(
        `Drug Form with this name: ${drugForm.name} already exists, cannot update with this name`
      );
    }
    const updatedDrugForm = await DrugFormService.updateDrugForm(drugForm, id);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { drugForm: updatedDrugForm },
          "Drug Form updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the drug form!",
          false
        )
      );
  }
};

module.exports = {
  create,
  all,
  find,
  deleteDrugForm,
  update,
};
