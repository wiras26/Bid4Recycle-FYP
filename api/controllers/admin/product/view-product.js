module.exports = {


  friendlyName: 'View product',


  description: 'Display "Product" page.',

  inputs: {

    id: {
      type: 'string'
    }

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/admin/product/product'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Product.findOne(filter).populate('company_id');

    }

    var companyList = await Company.find({
      select: ['name']
    })
    .meta({
      makeLikeModifierCaseInsensitive: true
    })
    .sort('name ASC');

    console.log(data)

    return exits.success({
      data: data,
      companyList: companyList
    });

  }


};
