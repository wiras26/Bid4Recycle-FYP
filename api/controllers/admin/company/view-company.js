module.exports = {


  friendlyName: 'View company',


  description: 'Display "Company" page.',

  inputs: {

    id: {
      type: 'string'
    }

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/company/company'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Company.findOne(filter);

    }

    console.log('DATA ',data)

    return exits.success({
      data: data,
    });

  }


};
