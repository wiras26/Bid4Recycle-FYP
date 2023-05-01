module.exports = {


  friendlyName: 'View home',


  description: 'Display "Home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/home'
    }

  },


  fn: async function (inputs,exits) {

    var cardboardList = [];
    var metalList = [];
    var paperList = [];
    var plasticList = [];
    var textilesList = [];
    var woodList = [];

    var productList = await Product.find().sort('createdAt DESC');

    for (var x = 0; x < productList.length; x++){
      var temp = productList[x]
      if (temp.type === 'Cardboard'){
        cardboardList.push(temp)
      }
      if (temp.type === 'Metal'){
        metalList.push(temp)
      }
      if (temp.type === 'Paper'){
        paperList.push(temp)
      }
      if (temp.type === 'Plastic'){
        plasticList.push(temp)
      }
      if (temp.type === 'Textiles'){
        textilesList.push(temp)
      }
      if (temp.type === 'Wood'){
        woodList.push(temp)
      }  
    }

   console.log('Product list ',productList)
    return exits.success({
      data: productList,
      cardboardList: cardboardList,
      metalList: metalList,
      paperList: paperList,
      plasticList: plasticList,
      textilesList: textilesList,
      woodList: woodList
    });

  }


};
