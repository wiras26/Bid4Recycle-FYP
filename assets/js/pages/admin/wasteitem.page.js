parasails.registerPage('wasteitem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    syncing: false,
    cloudError: "",

    listView: "/admin/waste/wastelist",
    saveAction: "savewaste",

    saved: false,
    saveAndClose: false,
    isEdit: false,

    formData: {
      id: 0,
      name: '',
      quantity: 0
    },

    formErrors: {}
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    _.extend(this, SAILS_LOCALS);

    this.formData.id = this.data ? this.data.id : 0;
    this.formData.name = this.data ? this.data.name : '';
    this.formData.quantity = this.data ? this.data.quantity : null;
    this.isEdit = this.data ? true:false;

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    savedAndClose: async function () {
      this.saveAndClose = true;
    },

    //VALIDATION
    handleParsingForm: function () {
      this.formErrors = {};
      this.saved = false;

      var argins = this.formData;

      if (!argins.name) {
        this.formErrors.name = true;
      }

      if (!argins.quantity) {
        this.formErrors.quantity = true;
      }

      

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      console.log('Data came to argins');
      console.log(argins);

      return argins;
    },

    submittedForm: async function (result) {
      if (result.error_status == 0) {
        if (this.saveAndClose == true) {
          window.location.href = this.listView
        } else {
          this.saved = true;
          this.formData.id = result.data.id;
          this.formData.slug = result.data.slug;
          window.scrollTo(0, 0);
        }
      } else {
        this.cloudError = true;
        this.saved = false;
      }
    },

    successMsgClose: function () {
      this.saved = false;
    },
  }
});
