module.exports = {


  friendlyName: 'View directory',


  description: 'Display "Directory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/directory'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
