<template>
  <div class="create">
    <!--create locus lists begin-->
    <div>
      <h2 class="newfontnosize" style="color: teal">Your Locus List</h2>
      <h3 class="p-2">Add item to your locus list:</h3>
      <form @submit.prevent="addLocus()">
        <input
          type="text"
          placeholder="location"
          v-model="newLocus.description"
          required
        />
        <input
          type="text"
          placeholder="optional image"
          v-model="newLocus.image"
        />
        <button class="btn border btn-info rounded" type="submit">Add</button>
      </form>
      <div id="media" class="container">
        <h3 class="mt-2 p-2">Edit items in your locus list:</h3>
        <form>
          <div class="card rounded boxborder">
            <div class="card-body" style="overflow-y: scroll; height: 10rem">
              <ol>
                <li v-for="locus in loci" :locus="locus" :key="locus.id">
                  <div class="row justify-content-center mb-2">
                    <textarea
                      type="text"
                      class="form-control col-5 m-1 boxborder rounded"
                      name="locusdescription"
                      id="locusdescription"
                      v-model.lazy="locus.description"
                      required
                    />
                    <textarea
                      type="text"
                      class="form-control col-5 m-1 boxborder rounded"
                      name="locusimage"
                      id="locusimage"
                      v-model.lazy="locus.image"
                      required
                    />
                    <div
                      class="col-1 align-content-center"
                      style="display: inline-grid"
                    >
                      <button
                        @click="editLocus(locus)"
                        type="button"
                        class="row btn btn-xs border rounded btn-primary m-1"
                      >
                        submit
                      </button>
                      <button
                        @click="deleteLocus(locus)"
                        type="button"
                        class="row btn btn-xs border rounded btn-primary m-1"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </form>
        <div class="row justify-content-center">
          <button
            @click="clearLocuslist()"
            type="button"
            class="row btn btn-xs border rounded btn-primary m-1 p-2"
          >
            delete all items from list
          </button>
        </div>
      </div>
    </div>
    <!--create locus lists end-->
    <hr class="divider" />
    <!--create study lists begin-->
    <div>
      <h2 class="newfontnosize" style="color: indigo">Your Study Lists</h2>
      <h3 class="mt-2 p-2">Create a new study list</h3>
      <div>
        <form @submit.prevent="createStudylist()">
          <div class="row justify-content-center">
            <label for="studylist" class="mx-2">Study List Title:</label><br />
            <input
              type="text"
              id="studylist"
              name="studylist"
              v-model="newStudylist.title"
              class="mb-3 mx-2"
            /><br />
            <input
              type="submit"
              value="Create new list"
              class="mx-2 btn border btn-info rounded"
              style="max-height: 2rem"
            />
          </div>
        </form>
        <h3 class="mt-3">Choose a study list to add items to or to edit</h3>
        <div>
          <form>
            <label for="activestudy">Select a list to edit:</label>
            <select v-model="selectStudyList" id="activestudy">
              <option
                v-for="studylist in studylists"
                :studylist="studylist"
                :key="studylist.id"
                :value="studylist.id"
              >
                {{ studylist.title }}
              </option>
            </select>
          </form>
        </div>
        <form
          @submit.prevent="addStudyitem()"
          class="row justify-content-center"
        >
          <label for="studyitem" class="col-10">Enter study item:</label><br />
          <input
            type="text"
            id="studyitem"
            name="item"
            placeholder="Enter study item"
            class="col-10 mb-2"
          />
          <input
            type="text"
            id="studyimage1"
            name="studimg"
            placeholder="add image URL (optional)"
            class="col-10 mb-2"
          />
          <input
            type="text"
            id="studyimage2"
            name="studimg"
            placeholder="add image URL (optional)"
            class="col-10 mb-2"
          />
          <input
            type="text"
            id="studyimage3"
            name="studimg"
            placeholder="add image URL (optional)"
            class="col-10 mb-2"
          />
          <input
            type="submit"
            value="Add item"
            class="btn border btn-info rounded col-3 mb-2"
          />
        </form>
      </div>
      <div id="media" class="container mt-4">
        <p>Edit items in your study list:</p>
        <form>
          <div class="card">
            <div
              class="card-body boxborder rounded"
              style="overflow-y: scroll; height: 10rem"
            >
              <ol>
                <li
                  v-for="item in currentStudyitems"
                  :item="item"
                  :key="item.id"
                >
                  <div class="row justify-content-center mb-2">
                    <button
                      @click="deleteStudy(item)"
                      type="button"
                      class="row btn btn-xs border rounded btn-primary mr-5 p-1 mt-2"
                      style="max-height: 2rem"
                    >
                      delete
                    </button>
                    <h4 class="d-flex align-items-center">text:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1 boxborder rounded"
                      name="studyitemtitle"
                      id="studyitemtitle"
                      v-model.lazy="item.title"
                      required
                    />
                  </div>
                  <div class="row justify-content-center">
                    <button
                      @click="editStudy(item)"
                      type="button"
                      class="row btn btn-xs border rounded btn-primary m-1 p-2"
                    >
                      edit text
                    </button>
                  </div>
                  <div class="row justify-content-center">
                    <h4 class="d-flex align-items-center">image 1:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1 boxborder rounded"
                      name="studyitemimage"
                      id="studyitemimage"
                      v-model.lazy="item.imgURL1"
                      required
                    />
                  </div>
                  <div class="row justify-content-center">
                    <button
                      @click="editStudy(item)"
                      type="button"
                      class="row btn btn-xs border rounded btn-primary m-1 p-2"
                    >
                      edit image 1
                    </button>
                  </div>
                  <div class="row justify-content-center mb-1">
                    <h4 class="d-flex align-items-center">image 2:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1 boxborder rounded"
                      name="studyitemimage"
                      id="studyitemimage"
                      v-model.lazy="item.imgURL2"
                      required
                    />
                  </div>
                  <div class="row justify-content-center">
                    <button
                      @click="editStudy(item)"
                      type="button"
                      class="row btn btn-xs border rounded btn-primary m-1 p-2"
                    >
                      edit image 2
                    </button>
                  </div>
                  <div class="row justify-content-center mb-1">
                    <h4 class="d-flex align-items-center">image 3:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1 boxborder rounded"
                      name="studyitemimage"
                      id="studyitemimage"
                      v-model.lazy="item.imgURL3"
                      required
                    />
                  </div>
                  <div class="row justify-content-center">
                    <button
                      @click="editStudy(item)"
                      type="button"
                      class="row btn btn-xs border rounded btn-primary m-1 p-2"
                    >
                      edit image 3
                    </button>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </form>
      </div>
    </div>
    <form @submit.prevent="deleteStudylist()">
      <label for="activestudy" class="mt-3 mb-1"
        >Select a list to delete:</label
      >
      <select v-model="deleteStudyList" id="activestudy">
        <option
          v-for="studylist in studylists"
          :studylist="studylist"
          :key="studylist.id"
          :value="studylist.id"
        >
          {{ studylist.title }}
        </option>
      </select>
      <br /><br />
      <input
        class="mb-3 btn border btn-info rounded"
        type="submit"
        value="Delete selected list"
      />
    </form>
    <!--create study lists end-->
  </div>
</template>

<script>
export default {
  name: "create",
  mounted() {
    this.$store.dispatch("getStudylists");
    this.$store.dispatch("getStudyitems");
    this.$store.dispatch("getLoci");
  },
  data() {
    return {
      newStudylist: {
        title: "",
      },
      newLocus: {
        description: "",
        image: "",
      },
      deleteStudyList: 0,
      selectStudyList: "",
    };
  },
  computed: {
    loci() {
      return this.$store.state.loci;
    },
    studylists() {
      return this.$store.state.studylists;
    },
    studyitems() {
      return this.$store.state.studyitems;
    },
    currentStudyitems() {
      this.$store.dispatch("getCurrentstudy", this.selectStudyList);
      return this.$store.state.currentstudyitems;
    },
  },
  methods: {
    //takes each new locus item and adds it to array of items in user's single locus list
    addLocus() {
      this.$store.dispatch("addLocus", {
        description: this.newLocus.description,
        image: this.newLocus.image,
      });
      this.newLocus.description = "";
      this.newLocus.image = "";
    },

    //submits altered locus and replaces old version with this version
    editLocus(locus) {
      this.$store.dispatch("editLocus", locus);
    },

    //deletes single item from current locus list
    deleteLocus(locus) {
      let id = locus.id;
      this.$store.dispatch("deleteLocus", id);
    },

    //deletes all items from current locus list
    clearLocuslist() {
      this.$store.dispatch("clearLocuslist");
    },

    //adds description and any images to create a new study item object with id of selected study lsit
    async addStudyitem() {
      await this.$store.dispatch("addStudyitem", {
        title: document.getElementById("studyitem").value,
        imgURL1: document.getElementById("studyimage1").value,
        imgURL2: document.getElementById("studyimage2").value,
        imgURL3: document.getElementById("studyimage3").value,
        studyListId: this.selectStudyList,
      });
      document.getElementById("studyitem").value = "";
      document.getElementById("studyimage1").value = "";
      document.getElementById("studyimage2").value = "";
      document.getElementById("studyimage3").value = "";
    },

    //submits altered study item and replaces old version with this version
    editStudy(study) {
      this.$store.dispatch("editStudy", study);
    },

    //deletes single item from current studylist
    deleteStudy(study) {
      this.$store.dispatch("deleteStudy", {
        id: study.id,
        studyListId: this.selectStudyList,
      });
    },

    //creates a study list with items
    async createStudylist() {
      await this.$store.dispatch("addStudylist", this.newStudylist);
      this.newStudylist.title = "";
    },

    //delete any study list
    deleteStudylist() {
      let id = this.deleteStudyList;
      this.$store.dispatch("deleteStudylist", id);
    },
  },
};
</script>