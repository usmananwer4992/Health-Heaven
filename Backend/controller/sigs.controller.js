const SigService = require("../services/sig.service");
const ResponseFormatService = require("../services/responseFormat.service");

create = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("Content can not be empty!");
    }

    const sig = {
      name: req.body.name,
    };

    const existingSig = await SigService.findByName(
      sig.name.toLowerCase()
    );
    if (existingSig) {
      throw new Error(
        `sig with this name: ${sig.name.toUpperCase()} already exists`
      );
    }

    const createdSig = await SigService.create(sig);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { sig: createdSig },
          "sig created successfully!",
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
          e.message || "Something went wrong while creating the sig!",
          false
        )
      );
  }
};

all = async (req, res) => {
  try {
    const Sigs = await SigService.findAll(req);
    const totalCount = await SigService.totalCount(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { Sigs, totalCount },
          "Sigs fetched successfully!",
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
          e.message || "Some error occurred while fetching Sigs",
          false
        )
      );
  }
};

find = async (req, res) => {
  const id = req.params.id;
  try {
    const sig = await SigService.findById(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { sig: sig },
          "sig fetched successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching the sig",
          false
        )
      );
  }
};

deleteSig = async (req, res) => {
  const id = req.params.id;
  try {
    const sig = await SigService.softDelete(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { sig: sig },
          "sig deleted successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting the sig",
          false
        )
      );
  }
};

update = async (req, res) => {
  const id = req.params.id;

  const sig = {
    name: req.body?.name,
  };

  try {
    const existingsig = await SigService.findById(id);
    if (!existingsig) {
      throw new Error(`sig with id: ${id} not found`);
    }

    const existingSigName = await SigService.findByName(
      sig.name.toUpperCase()
    );
    if (existingSigName) {
      throw new Error(
        `sig with this name: ${sig.name} already exists, cannot update with this name`
      );
    }
    const updatedSig = await SigService.update(
      sig,
      id
    );

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { sig: updatedSig },
          "sig updated successfully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating the Sig!",
          false
        )
      );
  }
};

module.exports = {
  create,
  all,
  find,
  deleteSig,
  update,
};
