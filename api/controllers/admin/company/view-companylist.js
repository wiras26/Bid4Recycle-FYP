module.exports = {


  friendlyName: 'View companylist',


  description: 'Display "Companylist" page.',

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
      viewTemplatePath: 'pages/admin/company/companylist'
    }

  },


  fn: async function (inputs, exits) {

   // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
   if (_.isEmpty(inputs)) {

    delete this.req.session.companyfilterlist;

  }

  // VARIABLES
  var data = [];
  var numRecords = 0;
  var filter = {};

  // SET FILTER
  if (typeof this.req.session.companyfilterlist !== "undefined") {

    if (this.req.session.companyfilterlist.name && (typeof inputs.name === 'undefined')) {

      inputs.name = this.req.session.companyfilterlist.name;

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

    data = await Company.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).sort('createdAt DESC');

    // RECORDS
    numRecords = await Company.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });

    this.req.session.companyfilterlist = inputs;

    console.log(data);    

    return exits.success({
      data: data,
      filter: this.req.session.companyfilterlist ? this.req.session.companyfilterlist : {}
    });
  }
};
