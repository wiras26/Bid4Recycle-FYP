module.exports = {


  friendlyName: 'Savecompany',


  description: 'Savecompany company.',


  inputs: {

    id:{
      type:'string'
    },

    name:{
      type:'string',
      required:true
    },

    companyLogo:{
      type:'ref'
    },

    description:{
      type:'string',
      required:true
    },

    number:{
      type:'number',
      required: true
    },

    address:{
      type:'string'
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log('SAVE ', inputs)

    await Company.findOrCreate({
      id: inputs.id
    },{
      name: inputs.name,
      companyLogo: inputs.companyLogo,
      description: inputs.description,
      number: inputs.number,
      address: inputs.address
    })
      .exec(async (err, record, wasCreated) => {
        if (err) {

          return this.res.serverError(err);
        }

        if (wasCreated) {

          return exits.success({
            data: record,
            error_status: record ? 0 : 1
          });

        } else{ //UPDATE

          var updatedObj = await Company.updateOne({
            id: inputs.id
          })
            .set({
              name: inputs.name,
              companyLogo: inputs.companyLogo,
              description: inputs.description,
              number: inputs.number,
              address: inputs.address
            });
            console.log('updateCompany',updatedObj)
          return exits.success({
            data: updatedObj,
            error_status: updatedObj ? 0 : 1
          });
        }
      });
  }
};
