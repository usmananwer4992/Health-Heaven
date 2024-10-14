const db = require("../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const TransferService = require("../services/transfer.service"); // Update this import
const ResponseFormatService = require("../services/responseFormat.service");
const { Sequelize, Op } = require("sequelize");
const customersService = require("../services/customers.service");
const pharmacyService = require("../services/pharmacy.service");

const buildWhereClause = (query) => {
  const { id, partnerId } = query;
  const whereClause = {};

  if (id) whereClause.id = id;
  if (partnerId) whereClause.partnerId = partnerId;
  return whereClause;
};

const getValidPage = (page) => {
  const parsedPage = parseInt(page);
  // Validate that page is a positive integer
  return isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
};

const getValidPageSize = (pageSize) => {
  const parsedPageSize = parseInt(pageSize);
  // Validate that pageSize is a positive integer
  return isNaN(parsedPageSize) || parsedPageSize < 1 ? 10 : parsedPageSize;
};

all = async (req, res) => {
  try {
    const page = getValidPage(req.query.page);
    const pageSize = getValidPageSize(req.query.pageSize);
    const offset = (page - 1) * pageSize;

    const whereClause = buildWhereClause(req.query);

    const {
      id,
      partnerId,
      transferType,
      drugName,
      pharmacyName,
      pharmacyPhone,
      patientFirstName,
      patientLastName,
      dob,
      status,
      sortBy,
      sortOrder,
    } = req.query;
    const order = [];
    const includeAssociations = [];

    // Define default associations without any conditions
    includeAssociations.push({
      model: db.drugs,
      as: "Drug",
    });

    includeAssociations.push({
      model: db.pharmacies,
      as: "Pharmacy",
    });

    includeAssociations.push({
      model: db.customer,
      as: "Customer",
    });

    includeAssociations.push({
      model: db.transferStatus,
      as: "TransferStatus",
    });
    includeAssociations.push({
      model: db.partners,
      as: "Partner",
    });

    // Define a function to create ILIKE filter for search parameter
    function createILikeFilter(fieldName, searchValue) {
      if (searchValue) {
        return {
          [fieldName]: {
            [Op.iLike]: `%${searchValue}%`,
          },
        };
      }
      return {};
    }

    // Conditionally update associations with search parameters
    includeAssociations[0].where = createILikeFilter("name", drugName);
    includeAssociations[1].where = createILikeFilter("name", pharmacyName);
    includeAssociations[1].where = {
      ...includeAssociations[1].where,
      ...createILikeFilter("phone", pharmacyPhone),
    };
    includeAssociations[2].where = createILikeFilter(
      "firstName",
      patientFirstName
    );
    includeAssociations[2].where = {
      ...includeAssociations[2].where,
      ...createILikeFilter("lastName", patientLastName),
      ...createILikeFilter("dob", dob),
    };
    includeAssociations[3].where = createILikeFilter("name", status);

    // Add sorting options
    if (sortBy === "drugName") {
      order.push([Sequelize.literal('"Drug.name"'), sortOrder || "desc"]);
    } else if (sortBy === "pharmacyName") {
      order.push([Sequelize.literal('"Pharmacy.name"'), sortOrder || "desc"]);
    } else if (sortBy === "pharmacyPhone") {
      order.push([Sequelize.literal('"Pharmacy.phone"'), sortOrder || "desc"]);
    } else if (sortBy === "patientFirstName") {
      order.push([Sequelize.literal('"Customer.firstName"'), sortOrder || "desc"]);
    } else if (sortBy === "patientLastName") {
      order.push([Sequelize.literal('"Customer.lastName"'), sortOrder || "desc"]);
    } else if (sortBy === "dob") {
      order.push([Sequelize.literal('"Customer.dob"'), sortOrder || "desc"]);
    } else if (sortBy === "status") {
      order.push([Sequelize.literal('"TransferStatus.name"'), sortOrder || "desc"]);
    } else {
      const defaultSortBy = sortBy || "createdAt";
      order.push([defaultSortBy, sortOrder || "desc"]);
    }

    const transfers = await TransferService.findAll({
      where: whereClause, // Add your where clause conditions here
      limit: pageSize,
      offset,
      order,
      include: includeAssociations,
    });

    const totalCount = await TransferService.count();
    res.send(
      ResponseFormatService.responseOk(
        { transfers, totalCount },
        "All Transfers",
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

findOne = async (req, res) => {
  const transferId = req.params.id;
  try {
    const transfer = await TransferService.findById(transferId);
    res.send(
      ResponseFormatService.responseOk(transfer, "Transfer Detail", true)
    );
  } catch (e) {
    console.log(e);
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

createTransfer = async (req, res) => {
  const transferSchema = Joi.object({
    apiKey: Joi.string().optional().default(null),
    drugId: Joi.string().required(),
    partnerId: Joi.number().optional().default(1),
    transferStatusId: Joi.number().optional().default(1),
    transferDayId: Joi.number().optional().default(1),
    sigId: Joi.number().optional().default(0),
    registeredPatientId: Joi.number().optional().default(0),
    registeredPharmacyId: Joi.number().optional().default(0),
    patientFirstName: Joi.string().optional(),
    patientLastName: Joi.string().optional(),
    patientEmail: Joi.string().email().optional(),
    patientPhone: Joi.string().optional(),
    patientDateOfBirth: Joi.date().iso().optional(),
    pharmacyName: Joi.string().optional(),
    pharmacyPhone: Joi.string().optional(),
    providerName: Joi.string().optional().allow(""),
    providerPhone: Joi.string().optional().allow(""),
    notes: Joi.string().optional().allow(""),
    quantity: Joi.string().optional().allow(""),
    refills: Joi.number().integer().optional().allow(""),
  });

  try {
    const { error: transferError } = transferSchema.validate(req.body);

    const transferValidationErrors = {};

    if (transferError) {
      if (transferError) {
        transferError.details.forEach((detail) => {
          transferValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...transferValidationErrors,
      };
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    let { registeredPatientId, registeredPharmacyId } = req.body;

    // If registeredPatientId is 0 (empty), create a customer
    const partnerId =
      req.body.partnerId || (await TransferService.fetchPartnerId(req));

    if (registeredPatientId === 0) {
      const reqData = req.body;
      const customerData = {
        firstName: reqData.patientFirstName,
        lastName: reqData.patientLastName,
        email: reqData.patientEmail,
        dob: reqData.patientDateOfBirth,
        phone: reqData.patientPhone,
        stateId: 1,
        partnerId: partnerId,
      };

      try {
        // Check Customer exist or not
        const existingCustomer = await customersService.getCustomerByEmailAndPhone(
          null,
          reqData.patientEmail,
          reqData.patientPhone
        );
    
        if (existingCustomer) {
          return res
            .status(400)
            .send(
              ResponseFormatService.responseBadRequest(
                null,
                { patientEmail: "Email and phone combination already exists" },
                false
              )
            );
        }
        // Attempt to create a new customer
        const createdCustomer = await customersService.createCustomer(
          customerData
        );

        if (createdCustomer && createdCustomer.id) {
          registeredPatientId = createdCustomer.id;
          console.log("registeredPatientId:", registeredPatientId);
        }
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          console.log(error);
        } else {
          console.error("Error:", error);
        }
        console.log(customerData);
      }
    }

    // If registeredPharmacyId is 0 (empty), create a pharmacy
    if (registeredPharmacyId === 0) {
      const reqData = req.body;
      const pharmacyData = {
        name: reqData.pharmacyName,
        phone: reqData.pharmacyPhone,
        stateId: 1, // Update with the appropriate state ID
        partnerId: partnerId,
      };

      try {
        // Attempt to create a new pharmacy
        const createdPharmacy = await pharmacyService.create(pharmacyData);

        if (createdPharmacy && createdPharmacy.id) {
          registeredPharmacyId = createdPharmacy.id;
          console.log("registeredPharmacyId:", registeredPharmacyId);
        }
      } catch (error) {

        return res
            .status(400)
            .send(
              ResponseFormatService.responseBadRequest(
                null,
                { patientEmail: error.phone },
                false
              )
            );
      }
    }

    // Now, you can use registeredPatientId and registeredPharmacyId in the transfer creation
    try {
      const transfer = await TransferService.create({
        ...req.body,
        sigId: null,
        customerId: registeredPatientId,
        pharmacyId: registeredPharmacyId,
        transferDrugId: req.body.drugId,
        partnerId,
      });
      return res
        .status(201)
        .send(
          ResponseFormatService.responseOk(
            transfer,
            "Transfer Created Successfully",
            true
          )
        );
    } catch (error) {
      console.log(error);
      
    }
  } catch (e) {
    console.log(e);
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

update = async (req, res) => {
  const transferSchema = Joi.object({
    drugId: Joi.number().required(),
    partnerId: Joi.number().optional().default(0),
    transferStatusId: Joi.number().optional().default(1),
    transferDayId: Joi.number().optional().default(1),
    sigId: Joi.number().required(),
    registeredPatientId: Joi.number().optional().default(0),
    registeredPharmacyId: Joi.number().optional().default(0),
    patientFirstName: Joi.string().required(),
    patientLastName: Joi.string().required(),
    patientEmail: Joi.string().email().required(),
    patientPhone: Joi.string().optional(),
    patientDateOfBirth: Joi.date().iso().required(),
    pharmacyName: Joi.string().required(),
    pharmacyPhone: Joi.string().required(),
    providerName: Joi.string().optional().allow(""),
    providerPhone: Joi.string().optional().allow(""),
    notes: Joi.string().optional().allow(""),
    quantity: Joi.string().optional().allow("").default(1),
    refills: Joi.number().integer().optional().allow("").default(0),
  });

  try {
    const transferId = req.params.id;

    const { error: transferError } = transferSchema.validate(req.body);

    const transferValidationErrors = {};

    if (transferError) {
      if (transferError) {
        transferError.details.forEach((detail) => {
          transferValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...transferValidationErrors,
      };
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    let { registeredPatientId, registeredPharmacyId } = req.body;

    // If registeredPatientId is 0 (empty), create a customer
    const partnerId =
      req.body.partnerId || (await TransferService.fetchPartnerId(req));

    if (registeredPatientId === 0) {
      const reqData = req.body;
      const customerData = {
        firstName: reqData.patientFirstName,
        lastName: reqData.patientLastName,
        email: reqData.patientEmail,
        patientPhone: reqData.patientPhone,
        dob: reqData.patientDateOfBirth,
        phone: reqData.pharmacyPhone,
        stateId: 1,
        partnerId: partnerId,
      };

      try {
        // Attempt to create a new customer
        const createdCustomer = await customersService.createCustomer(
          customerData
        );

        if (createdCustomer && createdCustomer.id) {
          registeredPatientId = createdCustomer.id;
          console.log("registeredPatientId:", registeredPatientId);
        }
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          console.log(error);
        } else {
          console.error("Error:", error);
        }
      }
    }

    // If registeredPharmacyId is 0 (empty), create a pharmacy
    if (registeredPharmacyId === 0) {
      const reqData = req.body;
      const pharmacyData = {
        name: reqData.pharmacyName,
        phone: reqData.pharmacyPhone,
        stateId: 1, // Update with the appropriate state ID
        partnerId: partnerId,
      };

      try {
        // Attempt to create a new pharmacy
        const createdPharmacy = await pharmacyService.create(pharmacyData);

        if (createdPharmacy && createdPharmacy.id) {
          registeredPharmacyId = createdPharmacy.id;
          console.log("registeredPharmacyId:", registeredPharmacyId);
        }
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          console.log(error);
        } else {
          console.error("Error:", error);
        }
      }
    }

    // Now, you can use registeredPatientId and registeredPharmacyId in the transfer update
    try {
      const updatedTransfer = await TransferService.update({
        ...req.body,
        sigId: req.body.sigId === 0? null:req.body.sigId,
        customerId: registeredPatientId,
        pharmacyId: registeredPharmacyId,
        transferDrugId: req.body.drugId,
        transferId, // Pass the transferId to identify which transfer to update
        quantity: req.body.quantity,
        refills: req.body.refills
      });

      res
        .status(200)
        .send(
          ResponseFormatService.responseOk(
            updatedTransfer,
            "Transfer updated successfully!",
            true
          )
        );
    } catch (error) {
      console.log(error);
    }
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

deleteTransfer = async (req, res) => {
  const transferId = req.params.id;

  try {
    const deleted = await TransferService.delete(transferId);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          deleted,
          "Transfer Deleted Successfully",
          true
        )
      );
  } catch (e) {
    return res
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

fetchStatuses = async (req, res) => {
  try {
    const statuses = await db.transferStatus.findAll();
    res.send(ResponseFormatService.responseOk(statuses, "All statuses", true));
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};

fetchDays = async (req, res) => {
  try {
    const days = await db.transferDays.findAll();
    res.send(ResponseFormatService.responseOk(days, "All days", true));
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};

getPrerequisite = async (req, res) => {
  // try {
  const partnerIdFromToken = await checkToken(req);
  const partnerId = req.body.partnerId;

  let partners = null;
  let whereClause = {};
  if (!partnerIdFromToken) {
    partners = await db.partners.findAll({
      attributes: ["id", "name"],
      order: [["name", "asc"]],
      where: { softDeleted: false },
    });
  } else {
    whereClause.partnerId = partnerIdFromToken;
  }
  const getDrugs = await db.drugs.findAll({
    attributes: ["id", "name"],
    order: [["name", "asc"]],
    where: { softDeleted: false },
  });

  const getCustomers = await db.customer.findAll({
    attributes: ["id", "firstName", "lastName", "email", "phone", "dob"],
    order: [["firstName", "asc"]],
    where: { ...whereClause, softDeleted: false },
    include: {
      model: db.partners,
      attributes: ["name"],
    },
  });
  const getPharmacy = await db.pharmacies.findAll({
    attributes: ["id", "name", "phone"],
    order: [["name", "asc"]],
  });

  const getTransferStatus = await db.transferStatus.findAll({
    attributes: ["id", "name"],
    order: [["id", "desc"]],
  });
  return res.status(200).send(
    ResponseFormatService.responseOk(
      {
        partners: partners,
        drugs: getDrugs,
        customers: getCustomers,
        pharmacy: getPharmacy,
        status: getTransferStatus
      },
      "Get transfer Prerequisite things for create an transfer successfully!",
      true
    )
  );
  // } catch (e) {
  //   res
  //     .status(500)
  //     .send(
  //       ResponseFormatService.responseInternalServer(
  //         null,
  //         e.message | "Something went wrong!",
  //         false
  //       )
  //     );
  // }
};

module.exports = {
  createTransfer,
  all,
  findOne,
  deleteTransfer,
  update,
  fetchStatuses,
  fetchDays,
  getPrerequisite,
};
