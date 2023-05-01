module.exports = {


  friendlyName: 'Uploadfile',


  description: 'Uploadfile upload.',

  files: ['mediaFile'],


  inputs: {

    mediaFile: {
      type: 'ref'
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var util = require('util');
    var mediaFileUrl = '';
    var mediaFilesArray = [];

    console.log("UPLOAD")

    // Upload the image.
    var files = await sails.helpers.flow.simultaneously(
      [async () => await sails.upload(inputs.mediaFile, {
        maxBytes: 30000000,
        maxTimeToBuffer: 30000
      })]
    ).intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
      .intercept((err) => new Error('The photo upload failed: ' + util.inspect(err)));

      files = files[0];

      for (var key in files) {
        if (files[key] !== undefined) {
          if (files[key].field == 'mediaFile') {
            mediaFileUrl = "https://wastemanagement20200134.s3.eu-north-1.amazonaws.com/" + files[key].fd;
            var fileObj = {
              fileName: files[key].filename,
              url: mediaFileUrl
            }
            mediaFilesArray.push(fileObj);
          }
        }
      }

      return exits.success({
        mediaFileUrl: mediaFileUrl,
        mediaFilesArray: mediaFilesArray
      });

  }


};
