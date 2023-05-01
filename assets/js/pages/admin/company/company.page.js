parasails.registerPage('company', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: "",

    listView: "/admin/company/companylist",
    saveAction: "savecompany",

    saved: false,
    saveAndClose: false,
    isEdit: false,

    formData:{
      id:0,
      name:'',
      description:'',
      number:'',
      address:'',
      companyLogo: {},
      image: {
        uploadStarted: false,
        uploadError: false,
        thumbnail: ''
      }
    },

    formErrors:{},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    this.formData.id = this.data ? this.data.id : 0;
    this.formData.name = this.data ? this.data.name : '';
    this.formData.description = this.data ? this.data.description: '';
    this.formData.number = this.data ? this.data.number : 0;
    this.formData.address = this.data ? this.data.address : '';
    this.formData.companyLogo = this.data ? this.data.companyLogo : {
      fileName: '',
      size: '',
      url: ''
    };
    this.isEdit = this.data ? true:false;

    if (this.data && this.data.companyLogo) {
      this.formData.image = {
        uploadStarted: false,
        uploadError: false,
        thumbnail: this.data.companyLogo,
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
      $("input[id='companyLogo']").click();
    },

    changeFileInput: async function (files, x) {
      var selectedFile = files[0];

      this.formData.companyLogo = {
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

      var result = await Cloud.uploadfile.with({
        mediaFile: selectedFile
      });

      this.formData.image.uploadStarted = false;

      if (result) {
        this.formData.companyLogo.url = result.mediaFileUrl;
        this.formData.companyLogo.extension = result.mediaFileUrl.split('.').pop();
      } else {
        this.formData.image.uploadError = true;
      }


      this.$forceUpdate();

    },

    removeThumbnail: function () {
      this.formData.companyLogo = {
          fileName: '',
          size: '',
          url: ''
      };
      this.$forceUpdate();
    },


    handleParsingForm: function(){

      this.formErrors = {}
      this.saved = false;

      var argins = this.formData

      if (!argins.name){
        this.formErrors.name = true;
      }

      if (!argins.description){
        this.formErrors.description = true;
      }

      if (!argins.number){
        this.formErrors.argins = true
      }

      if (!this.formData.companyLogo.url){
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
