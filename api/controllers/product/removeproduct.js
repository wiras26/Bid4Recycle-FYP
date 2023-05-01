module.exports = {


  friendlyName: 'Removeproduct',


  description: 'Removeproduct product.',


  inputs: {
    product_id:{
      type:"string"
    },

    company_id:{
      type:"string"
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    await Company.removeFromCollection(inputs.company_id, 'products').members(inputs.product_id)

    var result = await Product.destroy({
      id: inputs.product_id
    }).fetch();

    return exits.success({
      result: result,
    });

  }


};
