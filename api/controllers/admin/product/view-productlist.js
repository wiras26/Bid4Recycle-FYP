module.exports = {


  friendlyName: 'View productlist',


  description: 'Display "Productlist" page.',

  inputs:{
    name: {
      description:'Search Name',
      type: 'string',
    },

    page: {
      description: 'Page Number of the Pagenation',
      type: 'number'
    },

    limit: {
      description: 'Limit Records Per Page',
      type: 'number'
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/admin/product/productlist'
    }

  },


  fn: async function (inputs, exits) {

    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {

      delete this.req.session.productfilterlist;

    }

    // VARIABLES
    var data = [];
    var numRecords = 0;
    var filter = {};

     // SET FILTER
     if (typeof this.req.session.productfilterlist !== "undefined") {

      if (this.req.session.productfilterlist.name && (typeof inputs.name === 'undefined')) {

        inputs.name = this.req.session.productfilterlist.name;

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

    // FIND THE RECORDS

    data = await Product.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).sort('createdAt DESC');


    // RECORDS
    numRecords = await Product.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });

    this.req.session.productfilterlist = inputs;

    console.log(data);    

    return exits.success({
      data: data,
      filter: this.req.session.productfilterlist ? this.req.session.productfilterlist : {}
    });

  }


};
