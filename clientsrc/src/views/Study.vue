<template>
  <div class="study">
    <div>
      <div class="card-body row ml-5">
        <div
          v-show="!realReviewmode"
          v-if="begin"
          class="col-4 card mx-2 boxborder rounded"
        >
          <div class="mt-5">
            <h5>{{ sessionlist[sessionindex].locus.description }}</h5>
          </div>
          <br />
          <div v-if="showLocusImage" class="mb-5">
            <img
              class="picborder rounded"
              :src="sessionlist[sessionindex].locus.image"
              alt
              style="max-width: 8rem"
            />
          </div>
        </div>
        <div
          v-if="realReviewmode && begin"
          class="col-4 card mx-2 boxborder rounded"
        >
          <div class="mt-5">
            <h5>{{ reviewlist[sessionindex].locus.description }}</h5>
          </div>
          <br />
          <div v-if="showLocusImage" class="mb-5">
            <img
              class="picborder rounded"
              :src="reviewlist[sessionindex].locus.image"
              alt
              style="max-width: 8rem"
            />
          </div>
        </div>
        <div
          v-if="begin && !realReviewmode"
          v-show="showStudy"
          class="col-7 card mx-2 boxborder rounded ml-4"
        >
          <div class="mt-5">
            <h5>{{ sessionlist[sessionindex].study.title }}</h5>
          </div>
          <div v-if="showStudyImage" class="mt-3 row justify-content-center">
            <span class="m-2 p-1"
              ><img
                class="picborder rounded"
                :src="sessionlist[sessionindex].study.imgURL1"
                alt
                style="max-width: 8rem"
            /></span>
            <span class="m-2 p-1"
              ><img
                class="picborder rounded"
                :src="sessionlist[sessionindex].study.imgURL2"
                alt
                style="max-width: 8rem"
            /></span>
            <span class="m-2 p-1"
              ><img
                class="picborder rounded"
                :src="sessionlist[sessionindex].study.imgURL3"
                alt
                style="max-width: 8rem"
            /></span>
          </div>
        </div>
        <div
          v-if="begin && realReviewmode"
          v-show="showStudy"
          class="col-7 card mx-2 boxborder rounded ml-4"
        >
          <div class="mt-5">
            <h5>{{ reviewlist[sessionindex].study.title }}</h5>
          </div>
          <div v-if="showStudyImage" class="mt-3 row justify-content-center">
            <span class="m-2 p-1"
              ><img
                class="picborder rounded"
                :src="reviewlist[sessionindex].study.imgURL1"
                alt
                style="max-width: 8rem"
            /></span>
            <span class="m-2 p-1"
              ><img
                class="picborder rounded"
                :src="reviewlist[sessionindex].study.imgURL2"
                alt
                style="max-width: 8rem"
            /></span>
            <span class="m-2 p-1"
              ><img
                class="picborder rounded"
                :src="reviewlist[sessionindex].study.imgURL3"
                alt
                style="max-width: 8rem"
            /></span>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-5 card m-2 boxborder rounded">
          <h4 class="p-2"><b>Preferences</b></h4>
          <section class="mb-2">
            <p style="font-size: 0.8rem" class="mb-0">
              <b>
                Review mode (recycles incorrect answers until all answered
                correctly)</b
              >
            </p>
            <div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="reviewMode"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="reviewMode"
                  :value="false"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">off</p>
                <br />
              </div>
            </div>
          </section>
          <section class="mb-2">
            <p style="font-size: 0.8rem" class="mb-0">
              <b> show study element</b>
            </p>
            <div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="showStudy"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="showStudy"
                  :value="false"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">off</p>
                <br />
              </div>
            </div>
          </section>
          <section>
            <p style="font-size: 0.8rem" class="mb-0">
              <b>show locus image</b>
            </p>
            <div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="showLocusImage"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="showLocusImage"
                  :value="false"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">off</p>
                <br />
              </div>
            </div>
          </section>
          <section>
            <p style="font-size: 0.8rem" class="mb-0">
              <b>show study images</b>
            </p>
            <div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="showStudyImage"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3 justify-content-center">
                <input
                  type="radio"
                  v-model="showStudyImage"
                  :value="false"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">off</p>
                <br />
              </div>
            </div>
          </section>
        </div>
        <div class="col-5 card m-2 boxborder rounded">
          <h4 class="p-2"><b>Controls</b></h4>
          <div class="row justify-content-center">
            <button
              @click="start()"
              type="button"
              class="btn btn-sm border rounded btn-primary my-2"
            >
              START
            </button>
          </div>
          <div class="row justify-content-center">
            <button
              @click="reset()"
              type="button"
              class="btn mx-2 btn-sm border rounded btn-primary mb-2"
            >
              reset
            </button>
          </div>
          <div v-show="reviewMode" class="row justify-content-center">
            <button
              @click="right()"
              type="button"
              class="btn mx-2 btn-sm border rounded btn-primary mb-2"
            >
              right
            </button>
            <button
              @click="wrong()"
              type="button"
              class="btn mx-2 btn-sm border rounded btn-primary mb-2"
            >
              wrong
            </button>
          </div>
          <div v-show="!reviewMode" class="row justify-content-center">
            <button
              @click="next()"
              type="button"
              class="btn btn-sm border rounded btn-primary mb-2"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "study",
  mounted() {
    this.$store.dispatch("reset");
  },
  data() {
    return {
      reviewMode: false,
      realReviewmode: false,
      reviewItems: [],
      showStudy: true,
      showLocusImage: true,
      showStudyImage: true,
      begin: false,
    };
  },
  computed: {
    sessionlist() {
      let list = this.$store.state.activesessionlist;
      return list.pairs;
    },
    sessionindex() {
      return this.$store.state.sessionIndex;
    },
    reviewlist() {
      return this.reviewItems;
    },
  },
  methods: {
    next() {
      if (this.sessionindex == this.sessionlist.length - 1) {
        alert("You have finished the list! Click reset to go again");
      } else {
        this.$store.dispatch("advance");
      }
    },
    start() {
      this.begin = true;
      this.$store.dispatch();
    },
    reset() {
      this.begin = false;
      this.reviewMode = false;
      this.realReviewmode = false;
      this.reviewItems = [];
      this.$store.dispatch("reset");
    },
    right() {
      if (this.realReviewmode && this.reviewlist.length == 1) {
        swal({
          title: "You have completed this list",
          buttons: {
            confirm: { text: "Okay" },
          },
        });
      }
      if (
        !this.realReviewmode &&
        this.sessionindex == this.sessionlist.length - 1
      ) {
        this.realReviewmode = true;
        this.$store.dispatch("reset");
      } else if (
        this.realReviewmode &&
        (this.sessionindex == this.reviewlist.length - 2 ||
          this.sessionindex == this.reviewlist.length - 1)
      ) {
        this.reviewItems.splice(this.sessionindex, 1);
        this.$store.dispatch("reset");
      } else if (this.realReviewmode) {
        this.reviewItems.splice(this.sessionindex, 1);
        this.$store.dispatch("advance");
      } else {
        this.$store.dispatch("advance");
      }
    },
    wrong() {
      let wrongItem = this.sessionlist[this.sessionindex];
      if (
        !this.realReviewmode &&
        this.sessionindex == this.sessionlist.length - 1
      ) {
        this.realReviewmode = true;
        this.$store.dispatch("reset");
        this.reviewItems.push(wrongItem);
      } else if (
        this.realReviewmode &&
        this.sessionindex == this.reviewlist.length - 1
      ) {
        this.$store.dispatch("reset");
      } else if (this.realReviewmode) {
        this.$store.dispatch("advance");
      } else {
        this.reviewItems.push(wrongItem);
        this.$store.dispatch("advance");
      }
    },
  },
  components: {},
};
</script>


<style scoped>
</style>