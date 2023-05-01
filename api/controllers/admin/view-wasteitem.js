module.exports = {


  friendlyName: 'View wasteitem',


  description: 'Display "Wasteitem" page.',

  inputs: {

    id: {
      type: 'string'
    }

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/wasteitem'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Waste.findOne(filter);

    }

    console.log(data)
    // Respond with view.
    return exits.success({
      data: data,
    });

  }


};
