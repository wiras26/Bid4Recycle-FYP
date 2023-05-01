module.exports = {


  friendlyName: 'Saveproduct',


  description: 'Saveproduct something.',


  inputs: {
    id:{
      type:"string"
    },

    name:{
      type:"string",
      required : true
    },

    slug:{
      type:"string",
    },

    type:{
      type:"string",
      required : true
    },

    weight:{
      type:"number",
      required : true
    },

    location:{
      type:"string",
      required : true
    },

    productImage:{
      type:"ref",
    },

    company_id:{
      type:"string"
    },

    minBid:{
      type:"number"
    },

    maxBid:{
      type:"number"
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log('SAVE ',inputs)

    var slug = "";

    if (inputs.slug) {
      slug = await sails.helpers.slugs(inputs.slug, inputs.id ? inputs.id : '', 'Product');
    } else {
      slug = await sails.helpers.slugs(inputs.name, inputs.id ? inputs.id : '', 'Product');
    }

    await Product.findOrCreate({
      id: inputs.id
    },{
      name: inputs.name,
      slug: inputs.slug,
      type: inputs.type,
      weight: inputs.weight,
      location: inputs.location,
      productImage: inputs.productImage,
      company_id: inputs.company_id,
      minBid: inputs.minBid,
      maxBid: inputs.maxBid
    })
      .exec(async (err, record, wasCreated) => {
        if (err) {

          return this.res.serverError(err);
        }

        if (wasCreated) {

          await Company.addToCollection(inputs.company_id, 'products').members(record.id);

          return exits.success({
            data: record,
            error_status: record ? 0 : 1
          });

        } else{ //UPDATE

          var updatedObj = await Product.updateOne({
            id: inputs.id
          })
          .set({
            name: inputs.name,
            slug: inputs.slug,
            type: inputs.type,
            weight: inputs.weight,
            location: inputs.location,
            productImage: inputs.productImage,
            company_id: inputs.company_id,
            minBid: inputs.minBid,
            maxBid: inputs.maxBid
          });
          await Company.addToCollection(inputs.company_id, 'products').members(record.id);
          console.log('updateProduct',updatedObj)
          return exits.success({
            data: updatedObj,
            error_status: updatedObj ? 0 : 1
          });
        }
      });
  }
};
