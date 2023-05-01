parasails.registerPage('productitem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formData: {
      id: 0,
      userDetails: '',
      bidAmount: null
    },

    invalidBid: false,
    emptyField: false,
    offered: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    this.data = this.data ? this.data : {};
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    saveBid: async function(){
      console.log(this.me)
      var result = {}
      var argins = this.formData
      if (!argins.bidAmount){
        this.data.emptyField = true;
        this.$forceUpdate()
        return
      }

      if (argins.bidAmount < this.data.minBid){
        this.data.invalid = true; 
        this.$forceUpdate()
        return
      }

      
      
        
        result = await Cloud.savebid.with({
          userDetails: this.me,
          userId: this.me.id,
          productId: this.data.id,
          productName: this.data.name,
          bidAmount: this.formData.bidAmount
        });

        if (result !== {}){
          console.log("HELLO")
          this.data.offered = true
          this.$forceUpdate()
          return
        }
        
      
    }
  }
});
