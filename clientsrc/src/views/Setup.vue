<template>
  <div class="create">
    <div class="row">
      <h5 class="mx-5">
        Add locus and study items to a session list by taking any slice of your
        locus/study list and adding to the session list. Create slices by
        choosing a starting point and then an ending point for your slice and
        then click "add". You may add as many slices as you want in any order,
        or add the whole list. Make sure your locus list and your study list are
        equal in length.
      </h5>
    </div>
    <div class="row justify-content-center">
      <div class="card col-4 m-2 p-2">
        <h5>Create locus list for current study session:</h5>
        <div class="row justify-content-center">
          <div class="card col-10 m-2">
            <div class="card-body row justify-content-center">
              <div class="card col-11 m-2 p-2">
                <form>
                  <div>
                    <label for="locusstart"
                      >Select the first item (or single item) in the "slice" of
                      loci:</label
                    >
                    <select v-model="selectLocusstart" id="locusstart">
                      <option
                        v-for="locus in loci"
                        :locus="locus"
                        :key="locus.id"
                        :value="locus.id"
                      >
                        {{ locus.description }}
                      </option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="card col-11 m-2 p-2">
                <form>
                  <label for="locusend"
                    >Select the last item in the "slice" of loci:</label
                  >
                  <select v-model="selectLocusend" id="locusend">
                    <option
                      v-for="locus in loci"
                      :locus="locus"
                      :key="locus.id"
                      :value="locus.id"
                    >
                      {{ locus.description }}
                    </option>
                  </select>
                </form>
              </div>
              <button
                @click="createLocusslice()"
                type="button"
                class="col-11 btn btn-xs border rounded btn-primary m-1"
              >
                add slice
              </button>
            </div>
          </div>
        </div>

        <div>
          <form>
            <div class="row justify-content-center">
              <div class="card col-8 m-2">
                <p class="mt-2">Locus items in current session list:</p>
                <div
                  class="card mb-2"
                  style="overflow-y: scroll; height: 10rem"
                >
                  <ol>
                    <li
                      v-for="locus in sessionlocus"
                      :locus="locus"
                      :key="locus.id"
                    >
                      {{ locus.description }}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card col-3 m-2"></div>
      <div class="card col-4 m-2 p-2">
        <h5>Create study list for current study session:</h5>
        <div class="row justify-content-center">
          <div class="card col-10 m-2">
            <div class="card-body row justify-content-center p-0 pt-2">
              <form>
                <label for="activestudy"
                  >Select a study list to choose items from:</label
                >
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
            <div class="card-body row justify-content-center pb-0">
              <div class="card col-11 m-2 p-2">
                <form>
                  <label for="studystart"
                    >Select the first item (or single item) in the "slice" of
                    study items:</label
                  >
                  <select v-model="selectStudystart" id="locusstart">
                    <option
                      v-for="study in currentStudyitems"
                      :study="study"
                      :key="study.id"
                      :value="study.id"
                    >
                      {{ study.title }}
                    </option>
                  </select>
                </form>
              </div>
              <div class="card col-11 m-2 p-2">
                <form>
                  <label for="studyend"
                    >Select the last item in the "slice" of loci:</label
                  >
                  <select v-model="selectStudyend" id="studyend">
                    <option
                      v-for="study in currentStudyitems"
                      :study="study"
                      :key="study.id"
                      :value="study.id"
                    >
                      {{ study.title }}
                    </option>
                  </select>
                </form>
              </div>
            </div>
            <div class="row justify-content-center">
              <button
                @click="createStudyslice()"
                type="button"
                class="col-9 btn btn-xs border rounded btn-primary m-1 mb-3"
              >
                add slice
              </button>
            </div>
          </div>
          <div>
              <form>
                <div class="row justify-content-center">
                  <div class="card col-8 m-2">
                    <p class="mt-2">Study items in current session list:</p>
                    <div class="card-mb-2" style="overflow-y: scroll; height: 10rem">
                      <ol>
                        <li
                          v-for="study in sessionstudy"
                          :study="study"
                          :key="study.id"
                        >
                          {{ study.title }}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setup",
  mounted() {
    this.$store.dispatch("getStudylists");
    this.$store.dispatch("getStudyitems");
    this.$store.dispatch("getLoci");
  },
  data() {
    return {
      selectLocusstart: 0,
      selectLocusend: 0,
      selectStudystart: 0,
      selectStudyend: 0,
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
    sessionlocus() {
      return this.$store.state.sessionlocuslist;
    },
    sessionstudy() {
      return this.$store.state.sessionstudylist;
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
    //slices section of master locus list and sends to store to be added to a study session list
    createLocusslice() {
      let start = this.loci.findIndex((l) => l._id == this.selectLocusstart);
      let end = this.loci.findIndex((l) => l._id == this.selectLocusend) + 1;
      if (!start && end) {
        start = end - 1;
      } else if (!end && start) {
        end = start + 1;
      }
      let slice = this.loci.slice(start, end);
      this.$store.dispatch("setSeshlocuslist", slice);
      this.selectLocusstart = 0;
      this.selectLocusend = 0;
    },
    createStudyslice() {
      let start = this.currentStudyitems.findIndex(
        (s) => s._id == this.selectStudystart
      );
      let end =
        this.currentStudyitems.findIndex((s) => s._id == this.selectStudyend) +
        1;
      if (!start && end) {
        start = end - 1;
      } else if (!end && start) {
        end = start + 1;
      }
      let slice = this.currentStudyitems.slice(start, end);
      this.$store.dispatch("setSeshstudylist", slice);
      this.selectStudystart = 0;
      this.selectStudyend = 0;
    },
    //takes each new locus item and adds it to array of items in user's single locus list
    addLocus() {
      this.$store.dispatch("addLocus", {
        description: this.newLocus.description,
        image: this.newLocus.image,
      });
      this.newLocus.description = "";
      this.newLocus.image = "";
    },
    //deletes all items from current locus list
    clearLocuslist() {
      this.$store.dispatch("clearLocuslist");
    },
    //submits altered study item and replaces old version with this version
    editStudy(study) {
      this.$store.dispatch("editStudy", study);
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