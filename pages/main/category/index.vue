<template>
  <v-card light>
    <v-data-table
      :headers="headers"
      :items="categories"
      item-key="id"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="saveItem"
          @cancel="cancelItem"
          @open="openItem"
          @close="closeItem"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field v-model="props.item.name" label="Edit" single-line counter />
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Category</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="orange darken-2" dark class="mb-2" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card light>
              <v-card-title class="orange darker-1 white--text">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        prepend-icon="mdi-view-grid-plus"
                        shaped
                        color="orange darken-2"
                        outlined
                        label="Category name"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="editedItem.fileSource"
                        color="orange darken-2"
                        counter
                        label="File input"
                        placeholder="Select your files"
                        prepend-icon="mdi-camera"
                        outlined
                        shaped
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="overline grey--text text--darken-3 mx-2"
                          >+{{ files.length - 2 }} File(s)</span>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn color="red darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="orange darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.attachments="{item}">
        <td>
          <img :src="item.attachments[0].fileUrl" height="50" width="50" alt="category image">
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  layout: 'admin',

  components: {},

  data: () => ({
    expanded: [],
    singleExpand: false,
    dialog: false,
    headers: [
      {
        text: 'Image',
        align: 'start',
        sortable: false,
        value: 'attachments'
      },
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    categories: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      fileSource: ''
    },
    defaultItem: {
      name: '',
      fileSource: ''
    },

    snack: false,
    snackColor: '',
    snackText: '',
    max25chars: v => v.length <= 25 || 'Input too long!'
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    savedCategoryData () {
      const data = {
        name: this.editedItem.name
      }
      return data
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.$store
        .dispatch('category/getCategories')
        .then((response) => {
          this.categories = response.data.result.data
        })
        .catch((error) => {})
    },

    editItem (item) {
      this.editedIndex = this.categories.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.categories.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.categories.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      await this.$store
        .dispatch('category/storeCategory', this.savedCategoryData)
        .then((response) => {
          const formData = new FormData()
          formData.append('type', 'category')
          formData.append('resourceId', response.data.id)
          formData.append('description', 'saved from admin panel')
          formData.append('fileSource', this.editedItem.fileSource)

          this.$store
            .dispatch('attachment/storeAttachment', formData)
            .then((response) => {
              console.log(response, 'attach')
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.close()
        })
    },

    saveItem () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancelItem () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    openItem () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    closeItem () {
      console.log('Dialog closed')
    }
  }
}
</script>
