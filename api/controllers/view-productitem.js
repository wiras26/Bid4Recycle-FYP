module.exports = {


  friendlyName: 'View productitem',


  description: 'Display "Productitem" page.',

  inputs: {

    id: {
      type: 'string'
    }

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/productitem'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id){
      filter = {
        id: inputs.id
      };

      data = await Product.findOne(filter).populate('company_id')
      var productList = await Product.find().sort('createdAt DESC');
    }

    console.log('DATA ',productList)

    // Respond with view.
    return exits.success({
      data: data,
      productList: productList ? productList : []
    });

  }


};
