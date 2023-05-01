module.exports = {


  friendlyName: 'View dashboard',


  description: 'Display "Dashboard" page.',


  inputs:{},


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard'
    }

  },


  fn: async function (inputs, exits) {

    var xList = [];
    var yList = [];

    var wasteData = await Waste.find();

    for(var x = 0; x < wasteData.length; x++){
      xList.push(wasteData[x].name)
      yList.push(wasteData[x].quantity)
    }

    console.log(wasteData)

    // Respond with view.
    return exits.success({
      data: wasteData,
      xList: xList,
      yList: yList

    })

  }


};
