module.exports = {


  friendlyName: 'View wastelist',


  description: 'Display "Wastelist" page.',

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
      viewTemplatePath: 'pages/admin/waste/wastelist'
    }

  },


  fn: async function (inputs, exits) {

     // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
     if (_.isEmpty(inputs)) {

      delete this.req.session.wastefilterlist;

    }

    // VARIABLES
    var data = [];
    var numRecords = 0;
    var filter = {};

     // SET FILTER
     if (typeof this.req.session.wastefilterlist !== "undefined") {

      if (this.req.session.wastefilterlist.name && (typeof inputs.name === 'undefined')) {

        inputs.name = this.req.session.wastefilterlist.name;

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

    //FIND THE RECORDS

    data = await Waste.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).sort('createdAt DESC');

     // RECORDS
     numRecords = await Waste.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });

    this.req.session.wastefilterlist = inputs;

    console.log(data);    


    // Respond with view.
    return exits.success({
      data: data,
      filter: this.req.session.productfilterlist ? this.req.session.productfilterlist : {}
    });

  }


};
