<template>
  <v-card light>
    <v-data-table
      :headers="headers"
      :items="products"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      show-expand
      sort-by="name"
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
                <v-container grid-list-sm>
                  <v-row>
                    <v-col class="pa-0" cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        prepend-icon="mdi-view-grid-plus"
                        shaped
                        color="orange darken-2"
                        outlined
                        label="Brand name"
                      />
                    </v-col>
                    <v-col class="pa-0" cols="12">
                      <v-text-field
                        v-model="editedItem.surname"
                        prepend-icon="mdi-view-grid-plus"
                        shaped
                        color="orange darken-2"
                        outlined
                        label="Surname"
                      />
                    </v-col>
                    <v-col class="pa-0" cols="6">
                      <v-text-field
                        v-model="editedItem.price"
                        prepend-icon="mdi-view-grid-plus"
                        shaped
                        color="orange darken-2"
                        outlined
                        label="Price"
                      />
                    </v-col>
                    <v-col class="pa-0" cols="6">
                      <v-text-field
                        v-model="editedItem.oldPrice"
                        prepend-icon="mdi-view-grid-plus"
                        shaped
                        color="orange darken-2"
                        outlined
                        label="Old Price"
                        min="0"
                      />
                    </v-col>
                    <v-col class="pa-0" cols="12">
                      <v-autocomplete
                        v-model="editedItem.brands"
                        :items="brands"
                        item-text="name"
                        item-value="name"
                        outlined
                        shaped
                        chips
                        small-chips
                        light
                        label="Brands"
                        color="orange darken-2"
                        background-color="white"
                        prepend-icon="mdi-view-grid-plus"
                        multiple
                        return-name
                      />
                    </v-col>
                    <v-col class="pa-0" cols="12">
                      <v-autocomplete
                        v-model="editedItem.categories"
                        :items="categories"
                        item-text="name"
                        item-value="name"
                        outlined
                        shaped
                        chips
                        small-chips
                        light
                        label="Categories"
                        color="orange darken-2"
                        background-color="white"
                        prepend-icon="mdi-view-grid-plus"
                        multiple
                        return-name
                      />
                    </v-col>
                    <v-col class="pa-0" cols="12">
                      <v-autocomplete
                        v-model="editedItem.tags"
                        :items="tags"
                        shaped
                        outlined
                        chips
                        small-chips
                        light
                        label="Tags"
                        color="orange darken-2"
                        background-color="white"
                        prepend-icon="mdi-view-grid-plus"
                        multiple
                      />
                    </v-col>
                    <v-col class="pa-0" cols="12">
                      <v-autocomplete
                        v-model="editedItem.status"
                        :items="statuses"
                        shaped
                        outlined
                        chips
                        small-chips
                        light
                        label="Status"
                        color="orange darken-2"
                        background-color="white"
                        prepend-icon="mdi-view-grid-plus"
                        multiple
                      />
                    </v-col>
                    <v-col class="pa-0" cols="12">
                      <v-text-field
                        v-model="editedItem.shortIntroduction"
                        prepend-icon="mdi-view-grid-plus"
                        shaped
                        color="orange darken-2"
                        outlined
                        label="Short Intro"
                      />
                    </v-col>
                    <v-col class="pa-0" cols="12">
                      <v-textarea
                        v-model="editedItem.description"
                        prepend-icon="mdi-view-grid-plus"
                        shaped
                        color="orange darken-2"
                        outlined
                        label="Short Intro"
                      />
                    </v-col>

                    <v-col class="pa-0" cols="12">
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

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          More info about {{ item.name }}
        </td>
      </template>

      <template v-slot:item.attachments="{item}">
        <img :src="item.attachments[0].fileUrl" height="50" width="50" alt="category image">
      </template>

      <template v-slot:item.categories="{item}">
        <v-chip
          v-for="category in item.categories"
          :key="category"
          class="mx-1 orange darken-2 white--text"
        >
          {{ category }}
        </v-chip>
      </template>

      <template v-slot:item.tags="{item}">
        <v-chip v-for="tag in item.tags" :key="tag" class="mx-1 orange darken-2 white--text">
          {{ tag }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="$router.push('/main/products/'+item.id)">
          mdi-eye
        </v-icon>
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
      {
        text: 'Surname',
        align: 'start',
        sortable: true,
        value: 'surname'
      },
      {
        text: 'Price',
        align: 'start',
        sortable: true,
        value: 'price'
      },
      {
        text: 'Old Price',
        align: 'start',
        sortable: true,
        value: 'oldPrice'
      },
      {
        text: 'Status',
        align: 'start',
        sortable: true,
        value: 'status'
      },
      {
        text: 'Categories',
        align: 'center',
        value: 'categories',
        sortable: false
      },
      { text: 'Tags', value: 'tags', align: 'center', sortable: false },
      { text: 'Brands', value: 'brands', align: 'center', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    products: [],
    brands: [],
    categories: [],
    tags: ['New', 'Popular', 'Best'],
    statuses: ['Available', 'Stock out', 'low'],
    editedIndex: -1,
    editedItem: {
      name: '',
      surname: '',
      price: '',
      oldPrice: 0,
      brands: [],
      categories: [],
      tags: [],
      shortIntroduction: '',
      description: '',
      status: [],
      fileSource: ''
    },
    defaultItem: {
      name: '',
      surname: '',
      price: '',
      oldPrice: 0,
      brands: [],
      categories: [],
      tags: [],
      shortIntroduction: '',
      description: '',
      status: [],
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

    savedProductData () {
      const data = {
        name: this.editedItem.name,
        surname: this.editedItem.surname,
        price: this.editedItem.price,
        oldPrice: this.editedItem.oldPrice,
        status: this.editedItem.status,
        brands: this.editedItem.brands,
        categories: this.editedItem.categories,
        tags: this.editedItem.tags,
        shortIntroduction: this.editedItem.shortIntroduction,
        description: this.editedItem.description
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
    this.initializeCategories()
    this.initializeBrands()
  },

  methods: {
    initialize () {
      this.$store
        .dispatch('product/getProducts')
        .then((response) => {
          this.products = response.data.result.data
        })
        .catch((error) => {})
    },

    initializeCategories () {
      this.$store
        .dispatch('category/getCategories')
        .then((response) => {
          this.categories = response.data.result.data
        })
        .catch((error) => {})
    },

    initializeBrands () {
      this.$store
        .dispatch('brand/getBrands')
        .then((response) => {
          this.brands = response.data.result.data
        })
        .catch((error) => {})
    },

    editItem (item) {
      this.editedIndex = this.brands.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.brands.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.brands.splice(index, 1)
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
        .dispatch('product/storeProduct', this.savedProductData)
        .then((response) => {
          const formData = new FormData()
          formData.append('type', 'brand')
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
