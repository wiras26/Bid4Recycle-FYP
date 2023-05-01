module.exports = {


  friendlyName: 'Removecompany',


  description: 'Removecompany company.',


  inputs: {
    company_id:{
      type:"string"
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var result = await Company.destroy({
      id: inputs.company_id
    }).fetch()

    return exits.success({
      result: result
    });

  }


};
