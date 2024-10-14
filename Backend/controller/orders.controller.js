const OrderService = require("../services/orders.service");
const CustomerService = require("../services/customers.service");
const ResponseFormatService = require("../services/responseFormat.service");
const DrugService = require("../services/drug.service");
const OrderStatusService = require("../services/orderStatus.service");
const { partners, orderStatus } = require("../models");
const axios = require("axios");
const { Sigs, Partners } = require("../services/transfer.service");
const db = require("../models");
const Joi = require("joi");
const states = require("../models/states");
var _ = require('lodash');
const { Sequelize, or } = require("sequelize");

const parkyEndpoint = process.env.PARKY_ENDPOINT || '';
const twistelLink = process.env.TWISTEL_LINK || '';

const getDueDate = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// To get prerequisite things in order form
async function getPrerequisite(req, res) {
  try {

    const partnerIdFromToken = await checkToken(req);
    const partnerId = req.body.partnerId;


  let partners = null;
  let whereClause = {};
  if (!partnerIdFromToken) {
    partners = await Partners.findAll({
      attributes: ["id", "name"],
      order: [["name", "asc"]],
      where: { softDeleted: false },
    });
  } else {
    whereClause.partnerId = partnerIdFromToken;
  }
    const getOrderStatus = await OrderStatusService.findAllList();
    const getDrugs = await DrugService.findAll({
      attributes: ["id", "name"],
      order: [["name", "asc"]],
    });
    const getSigs = await Sigs.findAll({
      attributes: ["id", "name"],
      order: [["name", "asc"]],
    });

    const getCustomers = await CustomerService.getAll({
      attributes: ["id", "firstName", "lastName", "email", "phone", "dob","partnerId"],
      order: [["firstName", "asc"]],
      where: { ...whereClause, softDeleted: false },
      include: {
        model: Partners,
        attributes: ["name"],
      }
    });

    const getShippings = await db.shippings.findAll({
      attributes: ["id", "type", "price", "shippingCompany", "partnerId"],
      order: [["id", "desc"]],
      where: { ...whereClause},
      include: {
        model: Partners,
        attributes: ["name"],
      }
    });

   

    return res.status(200).send(
      ResponseFormatService.responseOk(
        {
          order_status: getOrderStatus,
          drugs: getDrugs,
          sigs: getSigs,
          customers: getCustomers,
          partners,
          shippings:getShippings
        },
        "Get order Prerequisite things for create an order successfully!",
        true
      )
    );
  } catch (error) {
    console.error("Error:1", error);
    throw Error(error);
  }
}
async function sendRequest(username, password, apiEndpoint, invoiceDetails) {
  // return {username, password, apiEndpoint, invoiceDetails}
  try {
    const response = await axios.post(
      apiEndpoint,
      JSON.stringify(invoiceDetails),
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: username,
          password: password,
        },
      }
    );

    console.log("Response:1", response);
    return response.data;
  } catch (error) {
    console.error("Error:1", error);
    throw Error(error);
  }
}
async function sendRequestParkey(
  username,
  password,
  apiEndpointSend,
  sendDetail
) {
  try {
    const response = await axios.post(apiEndpointSend, sendDetail, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: username,
        password: password,
      },
    });
    console.log("Response:2", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:2", error);
    throw Error(error);
  }
}

async function getTwistelResponse(twistelLink, twistelData) {
  try {
    const response = await axios.post(twistelLink, twistelData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:3", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:3", error);
    throw Error(error);
  }
}

create = async (req, res) => {
  // pre preffix is for prescriber
const liveOrder= process.env.NODE_ENV === 'production'? true:false
  try {
    const orderSchema = Joi.object({
      isLive: Joi.boolean().optional().default(false),
      erxRequired: Joi.boolean().required().messages(),
      isRefill: Joi.boolean().required().messages(),
      customerId: Joi.number().integer().required(),
      drugId: Joi.number().integer().required(),
      shippingCompany: Joi.string().optional(),
      price: Joi.string().optional().default(1),
      type: Joi.string().optional(),
      notes: Joi.string().optional(),
      quantity: Joi.string().optional().default(1),
      partnerId: Joi.string().required(),
      daySupply: Joi.number().integer().optional().default(1),
      refills: Joi.number().integer().optional().default(0),
      invoice_link: Joi.string().optional(),
      statusId: Joi.number().integer().required(),
      sigId: Joi.number().integer().required(),
      shippingStateId: Joi.number().integer().required(),
      shippingStreet: Joi.string().required(),
      shippingAppartment: Joi.string().required(),
      shippingName: Joi.string().required(),
      shippingAddress: Joi.string().optional(),
      shippingCity: Joi.string().required(),
      shippingZipCode: Joi.number().integer().required(),
      shippingId: Joi.number().integer().optional(),
      totalAmount: Joi.number().integer().optional(),
      orderDrugId: Joi.number().integer().optional(),
    });
    req.body.isLive = liveOrder
    let order = {};
  if (req.body.shippingCompany) {
    order = {
      isLive: req.body.isLive,
      erxRequired: req.body.erxRequired,
      customerId: req.body.customerId,
      // send drug id
      drugId: req.body.drugId,
      isRefill: req.body.isRefill,
      shippingCompany: req.body.shippingCompany,
      price: req.body.price,
      type: req.body.type,
      notes: req.body.notes,
      quantity: req.body.quantity,
      partnerId: req.body.partnerId,
      // userId: req.body.userId,
      daySupply: req.body.daySupply,
      refills: req.body.refills,
      invoice_link: req.body.invoice_link,
      statusId: req.body.statusId,
      sigId: req.body.sigId,
      shippingStateId: req.body.shippingStateId || 1,
      shippingStreet: req.body.shippingStreet,
      shippingAppartment: req.body.shippingAppartment,
      shippingName: req.body.shippingName,
      shippingAddress: req.body.shippingAddress,
      shippingCity: req.body.shippingCity,
      shippingZipCode: req.body.shippingZipCode,
    };
  } else {
    order = {
      isLive: req.body.isLive,
      erxRequired: req.body.erxRequired,
      customerId: req.body.customerId,
      // send drug
      shippingStateId: req.body.shippingStateId || 1,
      drugId: req.body.drugId,
      isRefill: req.body.isRefill,
      shippingId: req.body.shippingId,
      notes: req.body.notes,
      quantity: req.body.quantity,
      partnerId: req.body.partnerId,
      // userId: req.body.userId,
      daySupply: req.body.daySupply,
      refills: req.body.refills,
      invoice_link: req.body.invoice_link,
      statusId: req.body.statusId,
      sigId: req.body.sigId,
      shippingStreet: req.body.shippingStreet,
      shippingAppartment: req.body.shippingAppartment,
      shippingName: req.body.shippingName,
      shippingAddress: req.body.shippingAddress,
      shippingZipCode: req.body.shippingZipCode,
      shippingCity: req.body.shippingCity,
    };
  }


  let shippingObject;
  if (req.body.shippingCompany) {
   shippingObject = {
    shippingCompany: req.body.shippingCompany,
    price: req.body.price,
    type: req.body.type,
    partnerId: req.body.partnerId,
  };
  }
  const customer = await CustomerService.findOneCustomerByPk(
    order.customerId
  );

  if (req.body.shippingCompany) {
    const newShipping = await OrderService.createShipping(shippingObject);
    order.shippingId = newShipping.id;
  }
  console.log(req.body, "boddyyyy");
  const drug = await DrugService.findById(order.drugId);
  order.totalAmount = drug.price * order.quantity;
  const partner = await partners.findByPk(order.partnerId);
  if (req.body.shippingId) {
    console.log(req.body.shippingId, "shipping id  ");
    await OrderService.findShippingByPk(order.shippingId);
  }
  await OrderService.findSigByPk(order.sigId);
  await OrderService.findOrderStatusByPk(order.statusId);
  const orderDrug = await OrderService.createOrderDrug({
    quantity: order.quantity,
    isRefill: order.isRefill,
    drugId: order.drugId,
  });
  order.orderDrugId = orderDrug.id;
  order.totalAmount = parseInt(order.totalAmount);
  const { error: orderError } = orderSchema.validate(order);

    const orderValidationErrors = {};

    if (orderError) {
      if (orderError) {
        orderError.details.forEach((detail) => {
          orderValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...orderValidationErrors,
      };

      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }
  const orderFinal = await OrderService.create(order);

  return res
    .status(200)
    .send(
      ResponseFormatService.responseOk(
        { orderFinal },
        "order created successfully!",
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
          e.message || "Something went wrong while creating the order!" + e,
          false
        )
      );
  }
};
createH2O = async (req, res) => {
  // pre preffix is for prescriber
  const order = {
    isLive: req.body.isLive,
    customerId: req.body.customerId,
    // send drug id
    drugId: req.body.drugId,
    isRefill: req.body.isRefill,
    shippingId: req.body.shippingId,
    shippingName: req.body.shippingName,
    shippingAddress: req.body.shippingAddress,
    shippingCity: req.body.shippingCity,
    shippingStateId: req.body.shippingStateId,
    shippingZipCode: req.body.shippingZipCode,
    notes: req.body.notes,
    quantity: req.body.quantity,
    partnerId: req.body.partnerId,
    preName: req.body.preName,
    prePhone: req.body.prePhone,
    preAddress: req.body.preAddress,
    preNpiNumber: req.body.preNpiNumber,
    preSupervisor: req.body.preSupervisor,
    daySupply: req.body.daySupply,
    refills: req.body.refills,
    pre_state: req.body.pre_state,
    invoice_link: req.body.invoice_link,
    // activation_code: req.body.activation_code,
    statusId: req.body.statusId,
    sigId: req.body.sigId,
    shippingStreet: req.body.shippingStreet,
    shippingAppartment: req.body.shippingAppartment,
  };

  try {
    // check if the customer exist
    const customer = await CustomerService.findOneCustomerByPk(
      order.customerId
    );
    const drug = await DrugService.findById(order.drugId);
    order.totalAmount = drug.price * order.quantity;
    const partner = await partners.findByPk(order.partnerId);
    const shippingState = await OrderService.findStateByPk(
      order.shippingStateId
    );
    const shipping = await OrderService.findShippingByPk(order.shippingId);
    const sig = await OrderService.findSigByPk(order.sigId);
    const orderStatus = await OrderService.findOrderStatusByPk(order.statusId);
    const orderDrug = await OrderService.createOrderDrug({
      quantity: order.quantity,
      isRefill: order.isRefill,
      drugId: order.drugId,
    });
    console.log(orderDrug, " this is the order drug");
    order.orderDrugId = orderDrug.id;
    order.totalAmount = parseInt(order.totalAmount);
    const orderFinal = await OrderService.create(order);

    const name = orderFinal.preName;
    // const name = "Testing";

    let executionProps = {
      rx_type: 'prescription',
      provider_first_name: order.preName[0] || '',
      provider_last_name: order.preName[1] || '',
      provider_npi: order.preNpiNumber,
      provider_location: order.preAddress,
      patient_address_state: customer.address || '',
      patient_address_zipcode: customer.zipcode || '',
    };

    if (order.isRefill) {
      // ... (Previous code for invoice creation and sending to PayPal)

      // Third-party call to Parky before the third Twistel call
      const parkyData = {
        order_id: orderFinal.id,
        patient_name: customer.first_name,
        patient_phone: customer.phone,
        prescriber_name: order.preName,
        prescriber_npi_number: order.preNpiNumber || '',
        invoice_link: order.invoice_link || '',
        simulate: 'true',
      };

      // const parkyEndpoint = 'https://api.parkynow.com/platform/v1/prescriptions/hhConfirmPayment';
      const parkyResponse = await sendRequestToParky(parkyEndpoint, parkyData);

      console.log(parkyResponse);

      return res.send({ parkyResponse, bac: 'aslk' });
    } else {
      executionProps.workflow_ext_customer_id = 'parky_welcome';
    }

    const executionPro = JSON.stringify(executionProps);

    // Twistel call
    const twistelData = {
      system_id: '23fbce3a-e382-11ed-8ad4-0a58a9feac02',
      password: 'D3XYpETAiFMqZxdMn0JBwbl0',
      organization_id: '3642',
      external_id: customer.id,
      email: customer.email || '',
      phone: customer.phone || '',
      prefer_phone: true,
      firstname: customer.firstName,
      lastname: customer.lastName,
      dob: dobFormatted,
      workflow_ext_customer_id: executionProps.workflow_ext_customer_id,
      customer_execution_id: orderFinal.id,
      execution_props: executionPro,
    };

    // const twistelLink = 'https://stage.twistle.com/api/provision_and_initiate';
    const twistleResponse = await getTwistelResponse(twistelLink, twistelData);

    console.log(twistleResponse);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { orderFinal },
          "order created successfully!",
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
          e.message || "Something went wrong while creating the order!" + e,
          false
        )
      );
  }
};

all = async (req, res) => {
  try {
    const Orders = await OrderService.findAll(req);
    const totalCount = await OrderService.totalCount(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { Orders, totalCount },
          "Orders fetched successfully!",
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
          e.message || "Some error occurred while fetching Orders",
          false
        )
      );
  }
};

find = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await OrderService.findById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { order: order },
          "order fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the order",
          false
        )
      );
  }
};

deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await OrderService.softDelete(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { order: order },
          "order deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the order",
          false
        )
      );
  }
};

update = async (req, res) => {
  console.log(req.params, "params");

  const id = req.params.id;
// console.log(req.params);
const liveOrder= process.env.NODE_ENV === 'production'? true:false

  try {
    const orderSchema = Joi.object({
      isLive: Joi.boolean().optional().default(false),
      erxRequired: Joi.boolean().required().messages(),
      isRefill: Joi.boolean().required().messages(),
      customerId: Joi.number().integer().required(),
      drugId: Joi.number().integer().required(),
      shippingCompany: Joi.string().optional(),
      price: Joi.string().optional().default(1),
      type: Joi.string().optional(),
      notes: Joi.string().optional(),
      quantity: Joi.string().optional().default(1),
      partnerId: Joi.string().required(),
      daySupply: Joi.number().integer().optional().default(1),
      refills: Joi.number().integer().optional().default(0),
      invoice_link: Joi.string().optional(),
      statusId: Joi.number().integer().required(),
      sigId: Joi.number().integer().required(),
      shippingStateId: Joi.number().integer().required(),
      shippingStreet: Joi.string().required(),
      shippingAppartment: Joi.string().required(),
      shippingName: Joi.string().required(),
      shippingAddress: Joi.string().optional(),
      shippingCity: Joi.string().required(),
      shippingZipCode: Joi.number().integer().required(),
      shippingId: Joi.number().integer().optional(),
      totalAmount: Joi.number().integer().optional(),
      orderDrugId: Joi.number().integer().optional(),
    });
    req.body.isLive = liveOrder

    const existingorder = await OrderService.findById(id);
    if (!existingorder) {
      throw new Error(`order with id: ${id} not found`);
    }

    let order = {};
    if (req.body.shippingCompany) {
      order = {
        isLive: req.body.isLive,
      erxRequired: req.body.erxRequired,
      customerId: req.body.customerId,
      // send drug id
      drugId: req.body.drugId,
      isRefill: req.body.isRefill,
      shippingCompany: req.body.shippingCompany,
      price: req.body.price,
      type: req.body.type,
      notes: req.body.notes,
      quantity: req.body.quantity,
      partnerId: req.body.partnerId,
      // userId: req.body.userId,
      daySupply: req.body.daySupply,
      refills: req.body.refills,
      invoice_link: req.body.invoice_link,
      statusId: req.body.statusId,
      sigId: req.body.sigId,
      shippingStateId: req.body.shippingStateId || 1,
      shippingStreet: req.body.shippingStreet,
      shippingAppartment: req.body.shippingAppartment,
      shippingName: req.body.shippingName,
      shippingAddress: req.body.shippingAddress,
      shippingCity: req.body.shippingCity,
      shippingZipCode: req.body.shippingZipCode,
      };
    } else {
      order = {
        isLive: req.body.isLive,
      erxRequired: req.body.erxRequired,
      customerId: req.body.customerId,
      // send drug
      shippingStateId: req.body.shippingStateId || 1,
      drugId: req.body.drugId,
      isRefill: req.body.isRefill,
      shippingId: req.body.shippingId,
      notes: req.body.notes,
      quantity: req.body.quantity,
      partnerId: req.body.partnerId,
      // userId: req.body.userId,
      daySupply: req.body.daySupply,
      refills: req.body.refills,
      invoice_link: req.body.invoice_link,
      statusId: req.body.statusId,
      sigId: req.body.sigId,
      shippingStreet: req.body.shippingStreet,
      shippingAppartment: req.body.shippingAppartment,
      shippingName: req.body.shippingName,
      shippingAddress: req.body.shippingAddress,
      shippingZipCode: req.body.shippingZipCode,
      shippingCity: req.body.shippingCity,
      };
    }

    const shippingObject = {
      shippingCompany: req.body.shippingCompany,
      price: req.body.price,
      type: req.body.type,
      partnerId: req.body.partnerId,
    };

    try {
      // check if the customer exist
      const customer = await CustomerService.findOneCustomerByPk(
        order.customerId
      );

      if (req.body.shippingCompany) {
        const newShipping = await OrderService.createShipping(shippingObject);
        order.shippingId = newShipping.id;
      }
      const drug = await DrugService.findById(order.drugId);
      order.totalAmount = drug.price * order.quantity;
      const partner = await partners.findByPk(order.partnerId);
      if (req.body.shippingId)
        await OrderService.findShippingByPk(order.shippingId);
      await OrderService.findSigByPk(order.sigId);
      await OrderService.findOrderStatusByPk(order.statusId);
      const orderDrug = await OrderService.createOrderDrug({
        quantity: order.quantity,
        isRefill: order.isRefill,
        drugId: order.drugId,
      });
      order.orderDrugId = orderDrug.id;
      order.totalAmount = parseInt(order.totalAmount);
      const { error: orderError } = orderSchema.validate(order);
      const orderValidationErrors = {};

      if (orderError) {
        if (orderError) {
          orderError.details.forEach((detail) => {
            orderValidationErrors[detail.path[0]] = detail.message;
          });
        }
  
        const validationErrors = {
          ...orderValidationErrors,
        };
  
        return res
          .status(400)
          .send(
            ResponseFormatService.responseNotFound(null, validationErrors, false)
          );
      }
      
      console.log({ order });
      const orderFinal = await OrderService.update(order, id);

      return res
        .status(200)
        .send(
          ResponseFormatService.responseOk(
            { orderFinal },
            "order updated successfully!",
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
            e.message || "Something went wrong while creating the order!" + e,
            false
          )
        );
    }
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the Order!",
          false
        )
      );
  }
};

updateShipping = async (req, res) => {
  const id = req.params.id;

  try {
    const existingorder = await OrderService.findById(id);
    if (!existingorder) {
      throw new Error(`order with id: ${id} not found`);
    }

    let order = {};
    if (req.body.shippingCompany) {
      order = {
        statusId: req.body.statusId,
        notes: req.body.notes,
        trackingId: req.body.trackingId || null,
        customerId: req.body.customerId,
        statusId: req.body.statusId,
        drugId: req.body.drugId,
        sigId: req.body.sigId,
        relatedId: req.body.relatedId,
        shippingMethod: req.body.shippingMethod,
      };
    } else {
      order = {
        statusId: req.body.statusId,
        notes: req.body.notes,
        trackingId: req.body.trackingId || null,
        customerId: req.body.customerId,
        statusId: req.body.statusId,
        drugId: req.body.drugId,
        sigId: req.body.sigId,
        relatedId: req.body.relatedId,
        shippingMethod: req.body.shippingMethod,
      };
    }

    if(req.body.quantity != existingorder.quantity){
      order.quantity= req.body.quantity
      order.totalAmount = req.body.quantity * existingorder.OrderDrug.Drug.price
    }

    if(req.body.coPay != existingorder.coPay){
      order.coPay= req.body.coPay
      order.totalAmount = parseInt(req.body.coPay)
    }
    if(req.body.shippedAt != existingorder.shippedAt){
      order.shippedAt= req.body.shippedAt
    }

    try {
      // check if the customer exist
      // const customer = await CustomerService.findOneCustomerByPk(
      //   order.customerId
      // );

      // if (req.body.shippingCompany) {
      //   const newShipping = await OrderService.createShipping(shippingObject);
      //   order.shippingId = newShipping.id;
      // }

      // const drug = await DrugService.findById(order.drugId);
      // order.totalAmount = drug.price * order.quantity;
      // const partner = await partners.findByPk(order.partnerId);
      // if (req.body.shippingId)
      //   await OrderService.findShippingByPk(order.shippingId);
      // await OrderService.findSigByPk(order.sigId);
      // await OrderService.findOrderStatusByPk(order.statusId);
      // const orderDrug = await OrderService.createOrderDrug({
      //   quantity: order.quantity,
      //   isRefill: order.isRefill,
      //   drugId: order.drugId,
      // });
      // order.orderDrugId = orderDrug.id;
      // order.totalAmount = parseInt(order.totalAmount);
      // console.log({ order });
      const orderFinal = await OrderService.update(order, id);

      return res
        .status(200)
        .send(
          ResponseFormatService.responseOk(
            { orderFinal },
            "order updated successfully!",
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
            e.message || "Something went wrong while creating the order!" + e,
            false
          )
        );
    }
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the Order!",
          false
        )
      );
  }
};
orderView = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await OrderService.findById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { order: order },
          "order fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the order",
          false
        )
      );
  }
};


/**
 * Method: POST
 * This method for IMI custom solution
 * 
 */

const imiOrder =async (req, res) => {
  // pre preffix is for prescriber
const liveOrder= process.env.NODE_ENV === 'production'? true:false
const pogoWebsite = 'https://presspogo.com/'



  try {
    const orderSchema = Joi.object({
      // Customer's Information
      patientFirstName: Joi.string().required(),
      patientLastName: Joi.string().required(),
      patientPhone: Joi.string().required(),
      patientDob: Joi.string().required(),
      patientEmail: Joi.string().email().required(),
      patientStreetAddress: Joi.string().required(),
      patientSecondaryAddress: Joi.string().optional().allow("").default(null),
      patientCity: Joi.string().required(),
      patientState: Joi.string().required(),
      patientZipCode: Joi.string().required(),
      patientCardId: Joi.string().optional().allow("").default(null),
      patientRxBin: Joi.string().optional().allow("").default(null),
      patientPcn: Joi.string().optional().allow("").default(null),
      patientRxGroup: Joi.string().optional().allow("").default(null),

      // Physician's Information
      physicianName: Joi.string().required(),
      physicianCity: Joi.string().required(),
      physicianStateId: Joi.string().required(),
      physicianPhone: Joi.string().optional().allow("").required(),
      // Checkbox

      firstCheckBox: Joi.boolean().optional(),
      secondCheckBox: Joi.boolean().required(),
      thirdCheckBox: Joi.boolean().optional()
    });

    // Validation api
    const { error: orderError } = orderSchema.validate(req.body);
    const orderValidationErrors = {};

    if (orderError) {
      if (orderError) {
        orderError.details.forEach((detail) => {
          orderValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...orderValidationErrors,
      };

      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }
    // Validation api end
    const state =  _.first(await db.states.findOrCreate({where: {'name': req.body.patientState}}));
    const partner = await db.partners.findOne({where: {'website': pogoWebsite},  include: {
      model: db.shippings,
      
    }});
    const drugs = await db.drugs.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: [1700,1701]
        }
      }
    });
    const patient =  _.first( await db.customer.findOrCreate(
      {
        where: {
          firstName: req.body.patientFirstName,
          lastName: req.body.patientLastName,
          phone: req.body.patientPhone,
          email: req.body.patientEmail
        }, 
        defaults:{
          firstName: req.body.patientFirstName,
          lastName: req.body.patientLastName,
          phone: req.body.patientPhone,
          email: req.body.patientEmail,
          address: req.body.patientStreetAddress,
          secondaryAddress: req.body.patientSecondaryAddress,
          city: req.body.patientCity,
          stateId: state.id,
          zipCode: req.body.patientZipCode,
          partnerId: partner.id,
          dob: req.body.patientDob,
          insuranceCardId:req.body.patientCardId,
          insuranceRxBin:req.body.patientRxBin,
          insurancePcn:req.body.patientPcn,
          insuranceRxGroup:req.body.patientRxGroup,
          gender: 'others',
      }}));
    drugs.forEach(async(drug) => {
      // const drug= drugs[0]
        
        req.body.isLive = liveOrder
        let order = {
          isLive: req.body.isLive,
          customerId: patient.id,
          // statusid: 9,
          // send drug
          shippingStateId: state.id || 1,
          drugId: drug.id,
          isRefill: 0,
          shippingId: partner.Shippings && partner.Shippings[0].id,
          notes: 'Pogo Landing page Order',
          quantity: drug.id == 1701 ? 100:1,
          partnerId: partner.id,
          // userId: req.body.userId,
          daySupply: 0,
          refills: 0,
          invoice_link: null,
          statusId: 9,
          sigId: 1,
          shippingStreet: patient.address,
          shippingAppartment: patient.secondaryAddress,
          shippingName: patient.firstName +' '+ patient.lastName,
          shippingAddress: patient.address +' '+ patient.secondaryAddress,
          shippingZipCode: patient.zipCode,
          shippingCity: patient.city, 
          physicianName:req.body.physicianName,
          physicianCity :req.body.physicianCity,
          physicianStateId:parseInt(req.body.physicianStateId),
          physicianPhone:req.body.physicianPhone,
          firstCheckbox:req.body.firstCheckBox,
          secondCheckbox:req.body.secondCheckBox,
          thirdCheckbox:req.body.thirdCheckBox
        };
        order.totalAmount = drug.price * order.quantity;
        const orderDrug = await OrderService.createOrderDrug({
          quantity: order.quantity,
          isRefill: order.isRefill,
          drugId: order.drugId,
        });
        order.orderDrugId = orderDrug.id;
        order.totalAmount = parseInt(order.totalAmount);

        const test = await OrderService.create(order);
        console.log('order')
    });
    
  return res
    .status(200)
    .send(
      ResponseFormatService.responseOk(
        "order created successfully!",
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
          e.message || "Something went wrong while creating the order!" + e,
          false
        )
      );
  }
};

const imiOrderPrequsite = async(req, res) =>{
  try {
    const states = await db.states.findAll({attributes:['id', 'name']});
    return res.status(200).send(
      ResponseFormatService.responseOk(
        {
          states: states,          

        },
        "Get order Prerequisite things successfully!",
        true
      )
    );
  } catch (error) {
    throw Error(error);
  }
}
module.exports = {
  create,
  all,
  find,
  deleteOrder,
  update,
  createH2O,
  getPrerequisite,
  orderView,
  updateShipping,
  imiOrder,
  imiOrderPrequsite
};
