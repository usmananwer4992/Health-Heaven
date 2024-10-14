const { Op, ValidationError, where } = require("sequelize");
const db = require("../models");

class OrderService {
  constructor() {
    this.Orders = db.orders;
    this.OrderDrugs = db.orderDrugs;
    this.States = db.states;
    this.Shippings = db.shippings;
    this.Sigs = db.sigs;
    this.Statuses = db.orderStatus;
    this.Invoice = db.invoice;
    this.CUstomers = db.customer;
    this.Drugs = db.drugs;
    this.Partner = db.partners;
  }

  async findAll(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const partnerId = parseInt(req.body.partnerId) || null;
      const pageSize = parseInt(req.query.pageSize) || 10;

      const {
        id,
        daySupply,
        refills,
        invoiceLink,
        status,
        sig,
        live,
        customer,
        orderDrug,
        totalAmount,
        refill,
        shipping,
        notes,
        quantity,
        _partnerId,
        sortBy,
        sortOrder,
      } = req.query;
      const offset = (page - 1) * pageSize;
      const whereClause = {};
      // whereClause.softDelete = false;
      if (partnerId) {
        whereClause.partnerId = partnerId;
      }

      if (_partnerId && parseInt(_partnerId) > 0) {
        whereClause.partnerId = {
          [Op.eq]: parseInt(_partnerId),
        };
      }

      if (id && parseInt(id) > 0) {
        whereClause.id = {
          [Op.eq]: parseInt(id),
        };
      }

      if (shipping && parseInt(shipping) > 0) {
        whereClause.shippingId = {
          [Op.eq]: parseInt(shipping),
        };
      }

      if (customer && parseInt(customer) > 0) {
        whereClause.customerId = {
          [Op.eq]: parseInt(customer),
        };
      }

      if (orderDrug && parseInt(orderDrug) > 0) {
        whereClause.orderDrugId = {
          [Op.eq]: parseInt(orderDrug),
        };
      }

      if (daySupply && parseInt(daySupply) > 0) {
        whereClause.daySupply = {
          [Op.eq]: parseInt(daySupply),
        };
      }

      if (refills && parseInt(refills) > 0) {
        whereClause.refills = {
          [Op.eq]: parseInt(refills),
        };
      }

      if (status && parseInt(status) > 0) {
        whereClause.statusId = {
          [Op.eq]: parseInt(status),
        };
      }

      if (sig && parseInt(sig) > 0) {
        whereClause.sigId = {
          [Op.eq]: parseInt(sig),
        };
      }

      if (typeof live !== "undefined" && live !== "") {
        const isLive = parseInt(live, 10); // Ensure to specify the radix (base) 10
        whereClause.isLive = {
          [Op.eq]: !!isLive,
        };
      }

      if (typeof refill !== "undefined" && refill !== "") {
        const refillValue = parseInt(refill, 10); // Ensure to specify the radix (base) 10
        whereClause.isRefill = {
          [Op.eq]: !!refillValue,
        };
      }

      if (quantity && quantity.trim() !== "") {
        whereClause.quantity = {
          [Op.iLike]: `%${quantity}%`,
        };
      }

      if (notes && notes.trim() !== "") {
        whereClause.notes = {
          [Op.iLike]: `%${notes}%`,
        };
      }

      if (invoiceLink && invoiceLink.trim() !== "") {
        whereClause.invoice_link = {
          [Op.iLike]: `%${invoiceLink}%`,
        };
      }

      if (totalAmount && totalAmount.trim() !== "") {
        whereClause.totalAmount = {
          [Op.iLike]: `%${totalAmount}%`,
        };
      }

      const order = sortBy
      ? [[sortBy, sortOrder || "desc"]]
      : [["createdAt", "desc"]];
      return await this.Orders.findAll({
        where: whereClause,
        include: [
          {
            model: this.OrderDrugs,
            include: { model: this.Drugs, attributes: ["name"] },
          },
          this.States,
          this.Sigs,
          this.Statuses, 
          this.Shippings,
          this.CUstomers,
          this.Partner,
        ],
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error(e + "Something went wrong while fetching the Orders!");
    }
  }

  // orderDrugs
  async createOrderDrug(params) {
    // return 1
    try {
      return await this.OrderDrugs.create(params);
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while creating OrderDrug");
    }
  }
  async findOrderDrugByPk(id) {}
  async findStateByPk(id) {
    try {
      return await this.States.findByPk(id);
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the state");
    }
  }

  async findShippingByPk(id, shouldFetch = true) {
    console.log(shouldFetch, id);
    try {
      if (!shouldFetch) {
        // If shouldFetch is false, return null without querying the database
        return null;
      }

      console.log({ id });
      const shipping = await this.Shippings.findByPk(id);
      if (!shipping) {
        throw new Error("No records found");
      }
      return shipping;
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Shipping");
    }
  }
  async createShipping(shippingDetails) {
    return await this.Shippings.create(shippingDetails);
  }
  async findSigByPk(id) {
    try {
      const sig = await this.Sigs.findByPk(id);
      if (!sig) {
        throw new Error("No records found");
      }
      return sig;
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Sig");
    }
  }

  async findOrderStatusByPk(id) {
    try {
      const status = await this.Statuses.findByPk(id);
      if (status) {
        return status;
      } else {
        throw new Error("Now records found");
      }
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Sig");
    }
  }

  async totalCount(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const {
        id,
        daySupply,
        refills,
        invoiceLink,
        status,
        sig,
        live,
        customer,
        orderDrug,
        totalAmount,
        refill,
        shipping,
        notes,
        quantity,
      } = req.query;
      const offset = (page - 1) * pageSize;
      const partnerId =
        parseInt(req.query.partner) || parseInt(req.body.partnerId) || null;
        const whereClause = {};
      // whereClause.softDelete = false;
      if (partnerId) {
        whereClause.partnerId = partnerId;
      }
      if (id && parseInt(id) > 0) {
        whereClause.id = {
          [Op.eq]: parseInt(id),
        };
      }

      if (shipping && parseInt(shipping) > 0) {
        whereClause.shippingId = {
          [Op.eq]: parseInt(shipping),
        };
      }

      if (customer && parseInt(customer) > 0) {
        whereClause.customerId = {
          [Op.eq]: parseInt(customer),
        };
      }

      if (orderDrug && parseInt(orderDrug) > 0) {
        whereClause.orderDrugId = {
          [Op.eq]: parseInt(orderDrug),
        };
      }

      if (daySupply && parseInt(daySupply) > 0) {
        whereClause.daySupply = {
          [Op.eq]: parseInt(daySupply),
        };
      }

      if (refills && parseInt(refills) > 0) {
        whereClause.refills = {
          [Op.eq]: parseInt(refills),
        };
      }

      if (status && parseInt(status) > 0) {
        whereClause.statusId = {
          [Op.eq]: parseInt(status),
        };
      }

      if (sig && parseInt(sig) > 0) {
        whereClause.sigId = {
          [Op.eq]: parseInt(sig),
        };
      }

      if (typeof live !== "undefined" && live !== "") {
        const isLive = parseInt(live, 10); // Ensure to specify the radix (base) 10
        whereClause.isLive = {
          [Op.eq]: !!isLive,
        };
      }

      if (typeof refill !== "undefined" && refill !== "") {
        const refillValue = parseInt(refill, 10); // Ensure to specify the radix (base) 10
        whereClause.isRefill = {
          [Op.eq]: !!refillValue,
        };
      }

      if (quantity && quantity.trim() !== "") {
        whereClause.quantity = {
          [Op.iLike]: `%${quantity}%`,
        };
      }

      if (notes && notes.trim() !== "") {
        whereClause.notes = {
          [Op.iLike]: `%${notes}%`,
        };
      }

      if (invoiceLink && invoiceLink.trim() !== "") {
        whereClause.invoice_link = {
          [Op.iLike]: `%${invoiceLink}%`,
        };
      }

      if (totalAmount && totalAmount.trim() !== "") {
        whereClause.totalAmount = {
          [Op.iLike]: `%${totalAmount}%`,
        };
      }
      return await this.Orders.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Orders!");
    }
  }

  async findByName(name) {
    try {
      return await this.Orders.findOne({
        attributes: ["name"],
        where: {
          name: name,
          // softDelete: false,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Order by name");
    }
  }

  async findById(id) {
    try {
      return await this.Orders.findByPk(id, {
        include: [
          {
            model: this.OrderDrugs,
            include: {
              model: this.Drugs,
              attributes: ["name", "id", "price", "dosage"],
            },
          },
          this.States,

          this.Sigs,
          this.Statuses,
          this.Shippings,
          this.CUstomers,
          this.Partner,
        ],
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Order by ID");
    }
  }

  async create(data) {
    try {
      return await this.Orders.create(data);
    } catch (e) {
      if (e instanceof ValidationError) {
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Order already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while creating the Order");
    }
  }

  async update(data, id) {
    try {
      return await this.Orders.update(data, {
        where: { id: id },
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Order already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while updating the Order");
    }
  }

  async softDelete(id) {
    try {
      return await this.Orders.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while soft deleting the Order");
    }
  }

  async delete(id) {
    try {
      return await this.Orders.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Order");
    }
  }

  async getNextInvoiceNumber() {
    const invoiceData = await this.Invoice.findByPk(1);
    const nextInvoiceNumber = await this.Invoice.create({
      invoice_number: invoiceData.id + 1,
    });
    return nextInvoiceNumber.id;
  }

  async updateInvoice(id, invoiceLink) {
    try {
      await this.Orders.update(
        { invoice_link: invoiceLink },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error(" error occured while updating ");
    }
  }
  async getOrderView(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const partnerId = parseInt(req.body.partnerId) || null;
      console.log("###########", partnerId, "###########");
      const pageSize = parseInt(req.query.pageSize) || 10;
      const { search, sortBy, sortOrder } = req.query;
      const offset = (page - 1) * pageSize;
      const whereClause = {};
      // whereClause.softDelete = false;
      if (partnerId) {
        whereClause.partnerId = partnerId;
      }
      if (search && search.trim() !== "") {
        whereClause = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      const order = sortBy
        ? [[sortBy, sortOrder || "asc"]]
        : [["createdAt", "asc"]];
      return await this.Orders.findAll({
        where: whereClause,
        include: [
          {
            model: this.OrderDrugs,
            include: { model: this.Drugs, attributes: ["name"] },
          },
          this.States,
          this.Sigs,
          this.Statuses,
          this.Shippings,
          this.CUstomers,
          this.Partner,
        ],
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error(e + "Something went wrong while fetching the Orders!");
    }
  }

  // async findAll(id) {
  //   try {
  //     const page = parseInt(req.query.page) || 1;
  //     const partnerId = parseInt(req.body.partnerId) || null;
  //     console.log("###########", partnerId, "###########");
  //     const pageSize = parseInt(req.query.pageSize) || 10;
  //     const { search, sortBy, sortOrder } = req.query;
  //     const offset = (page - 1) * pageSize;
  //     const whereClause = {};
  //     // whereClause.softDelete = false;
  //     if (partnerId) {
  //       whereClause.partnerId = partnerId;
  //     }
  //     if (search && search.trim() !== "") {
  //       whereClause = {
  //         name: {
  //           [Op.iLike]: `%${search}%`,
  //         },
  //       };
  //     }
  //     const order = sortBy
  //       ? [[sortBy, sortOrder || "asc"]]
  //       : [["createdAt", "asc"]];
  //     return await this.Orders.findAll({
  //       where: whereClause,
  //       include: [
  //         {
  //           model: this.OrderDrugs,
  //           include: { model: this.Drugs, attributes: ["name"] },
  //         },
  //         this.States,
  //         this.Sigs,
  //         this.Statuses,
  //         this.Shippings,
  //         this.CUstomers,
  //         this.Partner,
  //       ],
  //       limit: pageSize,
  //       offset,
  //       order,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     throw new Error(e + "Something went wrong while fetching the Orders!");
  //   }
  // }

  async getOrderViewById(id) {
    try {
      return await this.Orders.findByPk(id, {
        where: whereClause,
        include: [
          {
            model: this.OrderDrugs,
            include: { model: this.Drugs, attributes: ["name", "id"] },
          },
          this.States,
          this.Sigs,
          this.Statuses,
          this.Shippings,
          this.CUstomers,
          this.Partner,
        ],
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Order by ID");
    }
  }
}

module.exports = new OrderService();
