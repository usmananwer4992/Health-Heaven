const { Op } = require("sequelize");
const PharmacyService = require("../services/pharmacy.service");
const ResponseFormatService = require("../services/responseFormat.service");
const Joi = require("joi");
findOnePharmacyByPk = async (req, res) => {
  const id = req.params.id;
  try {
    const pharmacy = await PharmacyService.findOneByPk(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { pharmacy },
          "Pharmacy with id= " + id + " fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong!",
          false
        )
      );
  }
};
findAllPharmacies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const { id, name, phone, sortBy, sortOrder } = req.query;
    const offset = (page - 1) * pageSize;
    const order = sortBy
      ? [[sortBy, sortOrder || "desc"]]
      : [["createdAt", "desc"]];
    let where = {};
    if (id) {
      where = { id };
    }
    if (name && name.trim() !== "") {
      where = {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      };
    }
    if (phone && phone.trim() !== "") {
      where = {
        phone: {
          [Op.iLike]: `%${phone}%`,
        },
      };
    }

    const pharmacies = await PharmacyService.findAll({
      where,
      offset,
      order,
    });
    const totalCount = await PharmacyService.totalCount(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { pharmacies: pharmacies, totalCount },
          "Pharmacies fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching customers",
          false
        )
      );
  }
};
createPharmacy = async (req, res) => {
  const pharmacySchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
  });

  try {
    const { name, phone } = req.body;
    const phamacyObject = {
      name,
      phone,
    };
    const { error: phamacyError } = pharmacySchema.validate(phamacyObject);

    const pharmacyValidationErrors = {};

    if (phamacyError) {
      if (phamacyError) {
        phamacyError.details.forEach((detail) => {
          pharmacyValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...pharmacyValidationErrors,
      };

      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    const pharmacy = await PharmacyService.create(phamacyObject);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { pharmacy },
          "Pharmacy created SuccessFully!",
          true
        )
      );
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e || "Something went wrong!",
          false
        )
      );
  }
};
deletePharmacy = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await PharmacyService.delete(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { deleted: data },
          "Pharmacy deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the Pharmacy",
          false
        )
      );
  }
};
updatePharmacy = async (req, res) => {
  const id = req.params.id;

  const pharmacySchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
  });

  try {
    const existingPharmacy = await PharmacyService.findOneByPk(id);
    if (!existingPharmacy) {
      throw new Error(`Pharmacy with id: ${id} not found`);
    }
    const { name, phone } = req.body;
    const phamacyObject = {
      name,
      phone,
    };

    const { error: phamacyError } = pharmacySchema.validate(phamacyObject);

    const pharmacyValidationErrors = {};

    if (phamacyError) {
      if (phamacyError) {
        phamacyError.details.forEach((detail) => {
          pharmacyValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...pharmacyValidationErrors,
      };

      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }
    const pharmacy = await PharmacyService.update(phamacyObject, id);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { pharmacy: pharmacy },
          "Pharmacy updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the Pharmacy!",
          false
        )
      );
  }
};
module.exports = {
  createPharmacy,
  findOnePharmacyByPk,
  findAllPharmacies,
  deletePharmacy,
  updatePharmacy,
};
