const CustomerService = require("../services/customers.service");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const ResponseFormatService = require("../services/responseFormat.service");

findOneCustomerByPk = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await CustomerService.findOneCustomerByPk(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { customer },
          "Customers fetched SuccessFully!",
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
          e.message || "Something went wrong!",
          false
        )
      );
  }
};
findAllCustomers = async (req, res) => {
  try {
    const partnerId = await checkToken(req);
    const customers = await CustomerService.findAllCustomers(partnerId, req);

    const count = await CustomerService.getCountCustomer(partnerId); 

    console.log("count", count);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { customers, totalCount: count },
          "Customers fetched SuccessFully!",
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
checkToken = async (req) => {
  let partnerId;
  if (req.body.apiKey) {
    partnerId = req.body.partnerId;
  } else {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    partnerId = decoded.partnerId;
  }
  console.log({partnerId})
  return partnerId;
};
createCustomer = async (req, res) => {
  try {
    const customerSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().allow("", null).optional(),
      address: Joi.string().required(),
      secondaryAddress: Joi.string().allow("", null).optional(),
      city: Joi.string().allow("", null).optional(),
      stateId: Joi.number().integer().required(),
      zipCode: Joi.number().integer().allow("", null).optional(),
      partnerId: Joi.number().integer().required(),
      dob: Joi.date().iso().max("now").raw().required(),
      gender: Joi.required(),
    });

    // Check if the combination of email and phone number already exists
    const existingCustomer = await CustomerService.getCustomerByEmailAndPhone(
      null,
      req.body.email,
      req.body.phone
    );

    if (existingCustomer) {
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(
            null,
            { email: "Email and phone combination already exists" },
            false
          )
        );
    }
    const partnerIdFromToken = await checkToken(req);
    const partnerId = req.body.partnerId || partnerIdFromToken;
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      secondaryAddress,
      city,
      stateId,
      zipCode,
      dob,
      gender,
    } = req.body;
    const customerObj = {
      firstName,
      lastName,
      phone,
      email,
      address,
      secondaryAddress,
      city,
      stateId,
      zipCode,
      partnerId,
      dob,
      gender,
    };
    const { error: customerError } = customerSchema.validate(customerObj);

    const customerValidationErrors = {};

    if (customerError) {
      if (customerError) {
        customerError.details.forEach((detail) => {
          customerValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...customerValidationErrors,
      };

      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    const customer = await CustomerService.createCustomer(customerObj);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { customer },
          "Customers created SuccessFully!",
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
          e.message || "Something went wrong!",
          false
        )
      );
  }
};
deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await CustomerService.softDeleteCustomer(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { deleted: data },
          "Customer deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the Customer",
          false
        )
      );
  }
};
updateCustomer = async (req, res) => {
  const id = req.params.id;

  const customerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().allow("", null).optional(),
    address: Joi.string().required(),
    secondaryAddress: Joi.string().allow("", null).optional(),
    city: Joi.string().allow("", null).optional(),
    stateId: Joi.number().integer().required(),
    zipCode: Joi.number().integer().allow("", null).optional(),
    partnerId: Joi.number().integer().required(),
    dob: Joi.date().iso().max("now").raw().required(),
    gender: Joi.required(),
  });

  try {
    const existingCustomer = await CustomerService.findOneCustomerByPk(id);
    if (!existingCustomer) {
      throw new Error(`Customer with id: ${id} not found`);
    }

    // Check if the combination of email and phone number already exists
    const existingCustomerByEmailPhone =
      await CustomerService.getCustomerByEmailAndPhone(
        id,
        req.body.email,
        req.body.phone
      );

    if (existingCustomerByEmailPhone) {
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(
            null,
            { email: "Email and phone combination already exists" },
            false
          )
        );
    }

    const partnerIdFromToken = await checkToken(req);
    const partnerId = req.body.partnerId || partnerIdFromToken;
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      secondaryAddress,
      city,
      stateId,
      zipCode,
      dob,
      gender,
    } = req.body;
    const customerObj = {
      firstName,
      lastName,
      phone,
      email,
      address,
      secondaryAddress,
      city,
      stateId,
      zipCode,
      partnerId,
      dob,
      gender,
    };
    const { error: customerError } = customerSchema.validate(customerObj);

    const customerValidationErrors = {};

    if (customerError) {
      if (customerError) {
        customerError.details.forEach((detail) => {
          customerValidationErrors[detail.path[0]] = detail.message;
        });
      }
    }
    const validationErrors = {
      ...customerValidationErrors,
    };
    const customer = await CustomerService.update(customerObj, id);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { customer: customer },
          "Customer updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the Customer!",
          false
        )
      );
  }
};
module.exports = {
  createCustomer,
  findAllCustomers,
  findOneCustomerByPk,
  deleteCustomer,
  updateCustomer,
};
