// const db = require("../models");
// const Partners = db.partners;

// checkPartnerCall = async (req) => {
//     let partnerId = null;

//     if (req.body.apiKey) {
//         const partner = await Partners.findOne({
//             attributes:[id],
//             where: {
//               [Sequelize.Op.eq]: { liveKey: req.body.apiKey },
//             },
//           });
//       partnerId = partner;
//     } else {
//       const token = req.headers.authorization?.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//       partnerId = decoded.partnerId;
//     }
//     console.log({partnerId})
//     return partnerId;
//   };