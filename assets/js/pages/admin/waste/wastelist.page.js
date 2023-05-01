parasails.registerPage('wastelist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: '',
    formErrors: {},

    listView: '/waste/wastelist',
    itemView: '/admin/waste/edit/',
    removeAction: 'removewaste',

    deleteModalOpen: false,
    clickedIndex: undefined,
    loading: false,

    formData:{
      name: ''
    }
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
    deleteWaste: async function (index) {

      this.loading = true;

      if (this.data[index].id) {
        await Cloud.removewaste.with({
          waste_id: this.data[index].id,
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
