<template>
  <div class="study">
    <div>
      <div class="card-body row">
        <div v-show="begin" class="col-4 card mx-2">
          <div class="mt-5">
            {{ sessionlist[sessionindex].locus.description }}
          </div>
          <br />
          <div v-if="showLocusImage" class="mb-5">
            <img
              :src="sessionlist[sessionindex].locus.image"
              alt
              style="max-width: 8rem"
            />
          </div>
        </div>
        <div v-if="begin" v-show="showStudy" class="col-7 card mx-2">
          <div class="mt-5">
            {{ sessionlist[sessionindex].study.title }}
          </div>
          <div v-if="showStudyImage" class="mt-3 row justify-content-center">
            <span class="m-2"
              ><img
                :src="sessionlist[sessionindex].study.imgURL1"
                alt
                style="max-width: 8rem"
            /></span>
            <span class="m-2"
              ><img
                :src="sessionlist[sessionindex].study.imgURL2"
                alt
                style="max-width: 8rem"
            /></span>
            <span class="m-2"
              ><img
                :src="sessionlist[sessionindex].study.imgURL3"
                alt
                style="max-width: 8rem"
            /></span>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-5 card m-2">
          <h4 class="p-2"><b>Preferences</b></h4>
          <section class="mb-2">
            <p style="font-size: 0.8rem" class="mb-0">
              <b> Review mode (recycles incorrect answers on repeat)</b>
            </p>
            <div>
              <div class="row ml-3">
                <input
                  type="radio"
                  v-model="reviewMode"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3">
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
              <div class="row ml-3">
                <input
                  type="radio"
                  v-model="showStudy"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3">
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
              <div class="row ml-3">
                <input
                  type="radio"
                  v-model="showLocusImage"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3">
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
              <div class="row ml-3">
                <input
                  type="radio"
                  v-model="showStudyImage"
                  :value="true"
                  style="margin-top: 0.185rem"
                />
                <p style="font-size: 0.8rem" class="ml-1 mb-0">on</p>
                <br />
              </div>
              <div class="row ml-3">
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
        <div class="col-5 card m-2">
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
            <button
              @click="repeat()"
              type="button"
              class="btn mx-2 btn-sm border rounded btn-primary mb-2"
            >
              repeat
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
          <div class="row justify-content-center">
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
  },
  methods: {
    next() {
      this.$store.dispatch("advance");
    },
    start() {
      this.begin = true;
    },
    reset() {
      this.begin = false;
      this.reviewMode = false;
      this.$store.dispatch("reset");
    },
  },
  components: {},
};
</script>


<style scoped>
</style>