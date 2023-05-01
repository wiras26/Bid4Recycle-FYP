module.exports = {


  friendlyName: 'View bids',


  description: 'Display "Bids" page.',

  inputs: {},


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/bid/bids'
    }

  },


  fn: async function (inputs, exits) {

   var bidList = await Bids.find();

   console.log(bidList)

   return exits.success({
    data: bidList ? bidList : {}
   })

  }


};
