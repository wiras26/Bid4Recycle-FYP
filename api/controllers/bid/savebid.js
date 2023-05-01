module.exports = {


  friendlyName: 'Savebid',


  description: 'Savebid bid.',


  inputs: {
    id:{
      type:"string"
    },

    userDetails: {
      type: "ref"
    },

    userId:{
      type: "string"
    },

    productId:{
      type: "string"
    },

    productName:{
      type: "string"
    },

    bidAmount: {
      type: "number"
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log('SAVE ',inputs)

   var record = await Bids.create({
      id: inputs.id,
      userDetails: inputs.userDetails,
      userId: inputs.userId,
      productId: inputs.productId,
      productName: inputs.productName,
      bidAmount: inputs.bidAmount
  })
  
  return exits.success({
    result: record
  });
  
  }
};
