parasails.registerPage('companylist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: '',
    formErrors: {},

    listView: '/company/companylist',
    itemView: '/admin/company/edit/',
    removeAction: 'removecompany',

    deleteModalOpen: false,
    clickedIndex: undefined,
    loading: false,

    formData:{
      name: '',
      number: 0
    },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    _.extend(this, SAILS_LOCALS);
    this.formData.name = this.filter.name ? this.filter.name : '';
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    deleteCompany: async function (index) {

      this.loading = true;

      if (this.data[index].id) {
        await Cloud.removecompany.with({
          company_id: this.data[index].id
        });
      }

      this.data[index] = [];
      this.data = this.data.filter((item, i) => i !== index);
      this.deleteModalOpen = false;

      this.loading = false;
    },

    modalOpen: async function (index) {

      this.clickedIndex = index;
      this.deleteModalOpen = true;

    },

    closeModal: function () {

      this.deleteModalOpen = false;
      this.cloudError = '';

    },
  }
});
