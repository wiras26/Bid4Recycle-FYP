parasails.registerPage('productlist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: '',
    formErrors: {},

    listView: '/product/productlist',
    itemView: '/admin/product/edit/',
    removeAction: 'removeproduct',

    deleteModalOpen: false,
    clickedIndex: undefined,
    loading: false,

    formData:{
      name: '',
      type: ''
    },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
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
    deleteProduct: async function (index) {

      this.loading = true;

      if (this.data[index].id) {
        await Cloud.removeproduct.with({
          product_id: this.data[index].id,
          company_id: this.data[index].company_id
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
