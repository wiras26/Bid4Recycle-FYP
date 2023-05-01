parasails.registerPage('product', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    syncing: false,
    cloudError: "",

    listView: "/admin/product/productlist",
    saveAction: "saveproduct",

    saved: false,
    saveAndClose: false,
    isEdit: false,

    formData:{
      id: 0,
      name: "",
      slug: "",
      type: "",
      weight: 0,
      location: "",
      productImage: {},
      image: {
        uploadStarted: false,
        uploadError: false,
        thumbnail: ''
      },
      company_id: "",
      minBid: 0,
      maxBid: 0,

    },

    formErrors:{},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    _.extend(this, SAILS_LOCALS);

     this.formData.id = this.data ? this.data.id : 0;
     this.formData.name = this.data ? this.data.name : '';
     this.formData.slug = this.data ? this.data.slug : '';
     this.formData.type = this.data ? this.data.type : '';
     this.formData.weight = this.data ? this.data.weight : null;
     this.formData.location = this.data ? this.data.location : '';
     this.formData.productImage = this.data ? this.data.productImage : {
      fileName: '',
      size: '',
      url: ''
     };
     this.formData.company_id =  this.data && this.data.company_id ? this.data.company_id.id : 0;
     this.formData.minBid = this.data ? this.data.minBid : null;
     this.formData.maxBid = this.data ? this.data.maxBid : null;
     this.isEdit = this.data ? true:false;

     if (this.data && this.data.productImage) {
      this.formData.image = {
        uploadStarted: false,
        uploadError: false,
        thumbnail: this.data.productImage,
      };
    }
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

    uploadFile: async function () {
      $("input[id='productImage']").click();
    },

    changeFileInput: async function (files, x) {
      var selectedFile = files[0];

      this.formData.productImage = {
        fileName: selectedFile.name,
        size: this.convertBytes(selectedFile.size),
        url: ''
      }

      if (!selectedFile) {
        return;
      }

      this.formData.image.uploadError = false;
      this.formData.image.uploadStarted = true;

      this.$forceUpdate();

      console.log('Media ',selectedFile)

      var result = await Cloud.uploadfile.with({
        mediaFile: selectedFile
      });

      this.formData.image.uploadStarted = false;

      if (result) {
        this.formData.productImage.url = result.mediaFileUrl;
        this.formData.productImage.extension = result.mediaFileUrl.split('.').pop();
      } else {
        this.formData.image.uploadError = true;
      }


      this.$forceUpdate();

    },

    removeThumbnail: function () {
      this.formData.productImage = {
          fileName: '',
          size: '',
          url: ''
      };
      this.$forceUpdate();
    },

    // VALIDATION
    handleParsingForm: function () {

      this.formErrors = {};
      this.saved = false;

      var argins = this.formData;

      console.log('Argins ',argins)

      if (!argins.name) {
        this.formErrors.name = true;
      }

      if (!argins.type) {
        this.formErrors.type = true;
      }

      if (!argins.weight) {
        this.formErrors.weight = true;
      }

      if (!argins.location) {
        this.formErrors.location = true;
      }

      if (!argins.company_id) {
        this.formErrors.company_id = true;
      }

      if (!argins.minBid) {
        this.formErrors.minBid = true;
      }

      if (!argins.maxBid) {
        this.formErrors.maxBid = true;
      }

      if (!this.formData.productImage.url){
        this.formData.image.uploadError = true;
        return;
      }

      console.log('Data came to argins');
      console.log(argins);

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

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

    convertBytes: function (bytes) {
      var output;
      if (bytes >= 1000000) {
        output = (bytes / 1000000).toFixed(1) + ' MB';
      } else if (bytes >= 1000) {
        output = (bytes / 1000).toFixed(1) + ' kB';
      } else {
        output = bytes + ' b';
      }

      return output;
    },



  }
});
