module.exports = {


  friendlyName: 'Savewaste',


  description: 'Savewaste something.',


  inputs: {
    id:{
      type:"string"
    },

    name:{
      type:"string",
    },

    quantity:{
      type:"number",
    },


  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log('SAVE ', inputs)

    await Waste.findOrCreate({
      id: inputs.id
    },{
      name: inputs.name,
      quantity: inputs.quantity
      
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

          var updatedObj = await Waste.updateOne({
            id: inputs.id
          })
            .set({
              name: inputs.name,
              quantity: inputs.quantity
             
            });
            console.log('updateCompany',updatedObj)
           return exits.success({
            data: record,
            error_status: record ? 0 : 1
          });
        }
      });


   
    
  }
};
