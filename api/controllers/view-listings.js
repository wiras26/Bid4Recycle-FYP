module.exports = {


  friendlyName: 'View listings',


  description: 'Display "Listings" page.',

  inputs:{
    name: {
      description: 'Search Name',
      type: 'string',
    },
    productType: {
      type: 'string'
    },
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/listings'
    }

  },


  fn: async function (inputs, exits) {

    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {
      delete this.req.session.modulefilterlist;
    }

     // VARIABLES
     var productList = [];
     var numRecords = 0;
     var filter = {};
     var filteredModulesByTrainer = [];
 
     // SET FILTER
     if (typeof this.req.session.modulefilterlist !== "undefined") {
       if (this.req.session.modulefilterlist.name && (typeof inputs.name === 'undefined')) {
         inputs.name = this.req.session.modulefilterlist.name;
       }
     }

     // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {
      var value = inputs[name];
      // NAME
      if (name == 'name' && value != '') {

        filter.name = {
          'contains': inputs.name
        };

      }
    });

    productList = await Product.find(filter)

    // Filter from type
    productList = inputs.productType && inputs.productType != 0 ? productList.filter(item => item.type && item.type === inputs.productType) : productList;



    console.log('Product list ',productList)
    return exits.success({
      data: productList,
      filter: this.req.session.modulefilterlist ? this.req.session.modulefilterlist : {},
    });

  }


};
