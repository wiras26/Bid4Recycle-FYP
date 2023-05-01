module.exports = {


  friendlyName: 'Removewaste',


  description: 'Removewaste something.',


  inputs: {
    waste_id:{
      type:'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var result = await Waste.destroy({
      id: inputs.waste_id
    }).fetch()

    // All done.
    return exits.success({
      result: result
    });

  }


};
