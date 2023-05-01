module.exports = {


  friendlyName: 'View edit profile',


  description: 'Display "Edit profile" page.',

  inputs:{},

  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-profile',
    }

  },


  fn: async function (inputs,exits) {

    var bidsList = await Bids.find({
      where: {
        userId: this.req.me.id
      }
    })

    console.log(bidsList)
    return exits.success({
      data: bidsList? bidsList : {}
    });

  }


};
