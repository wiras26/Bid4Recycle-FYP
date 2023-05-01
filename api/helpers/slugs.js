module.exports = {


  friendlyName: 'Slugs',


  description: 'Slugs something.',


  inputs: {

    name: {
      type: 'string'
    },

    id: {
      type: 'string'
    },

    modelname: {
      type: 'string'
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function(inputs, exits) {


    var keep_running = true;
    var counter = 1; // we use this to add a number

    // CREATE THE Slugs
    var getSlug = require('speakingurl');

    var slug = getSlug(inputs.name);

    do {

      counter++;
      // search for post with this slug
      await sails.models[inputs.modelname.toLowerCase()].findOne().where({
        slug: slug,
        id: {
          '!=': [inputs.id]
        },
      }).then(function(op) {
        if (op === undefined) {
          // Nothing found, stop executing
          keep_running = false;

        } else {

          // Create new slug
          slug = getSlug(inputs.name + "+" + counter);

        }

      });

    }
    while (keep_running);

    return exits.success(slug);

  }

};
