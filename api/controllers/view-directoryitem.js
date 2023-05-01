module.exports = {


  friendlyName: 'View directoryitem',


  description: 'Display "Directoryitem" page.',


  inputs: {
    type: {
      type: "string"
    }
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/directoryitem'
    }

  },


  fn: async function (inputs, exits) {

    var companyList = [];
    var filter = {};

    

    var productList = await Product.find({
      where:{
        type: inputs.type
    }}).select('company_id')

    for (var x = 0; x < productList.length; x++){
      filter = {
        id: productList[x].company_id
      };
      var companyElement = await Company.findOne(filter)
      companyList.push(companyElement)
    }

    console.log('LIST', companyList)
    // Respond with view.
    return exits.success({
      data: companyList
    });

  }


};
