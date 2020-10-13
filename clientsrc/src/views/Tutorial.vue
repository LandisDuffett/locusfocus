<template>
  <div class="home">
    <div class="row text-left mx-4">
      <router-link :to="{ name: 'home' }" class="nav-link"
        >Return home </router-link>
        <router-link :to="{ name: 'create' }" class="nav-link"
        >Create locus list (requires login) </router-link>
    </div>
     <div class="row justify-content-center mb-5">
        <div class="col-12 mb-3">
            <h1><u>Help contents</u></h1>
        </div>
        <div class="col-12 text-left ml-3">
            <h2><a href="#navbar">1. Navigation Bar</a></h2>
        </div>
         <div class="col-12 text-left ml-3">
            <h2><a href="#createlists">2. Create Lists</a></h2>
        </div>
         <div class="col-12 text-left ml-3">
            <h2><a href="#setup">3. Set up Study Session</a></h2>
        </div>
         <div class="col-12 text-left ml-3">
            <h2><a href="#session">4. Study Session</a></h2>
        </div>
    </div>
    <div class="row justify-content-center mb-5">
        <div id="navbar" class="col-12 mb-3">
            <h1><u>1. Navigation Bar</u></h1>
        </div>
        <div class="col-12">
            <img src="../assets/navbar.png" style="max-width: 75rem"/>
        </div>
    </div>
        <div class="row justify-content-center mb-5">
            <div id="createlists" class="col-12 mb-3">
                <h1><u>2. Create lists</u></h1>
            </div>
            <div class="col-12">
                <img src="../assets/createfull.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>A. Create lists: add items to locus list:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/addlocus.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>B. Create lists: edit items in locus list:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/editlocus.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>C. Create lists: delete all items in locus list:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/deletealllocus.png" style="max-width: 75rem"/>
            </div>
        </div>
       <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>D. Create lists: enter name for new study list:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/addstudy.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>E. Create lists: select a study list to work with:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/selectstudylist.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>F. Create lists: enter content and optional images for new study item:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/enterstudyitem.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>G. Create lists: edit study items in selected list:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/editstudyitem.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>H. Create lists: delete a study list:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/deletestudylist.png" style="max-width: 75rem"/>
            </div>
        </div>
         <div class="row justify-content-center mb-5">
            <div id="setup" class="col-12 mb-3">
                <h1><u>3. Set up study session</u></h1>
            </div>
            <div class="col-12">
                <img src="../assets/setupstudyfull.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>A. Set up study session: directions (see directions)</b></h4>
                </div>
            </div>
        </div>
         <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>B. Set up study session: add locus items:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/addlocustosession.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>C. Set up study session: add study items:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/addstudytosession.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>D. Set up study session: save session list just created:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/savesessionlist.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>E. Set up study session: delete study session list:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/deletestudylist.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>F./G. Set up study session: select session list for study session and go to study session:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/preparecurrent.png" style="max-width: 75rem"/>
            </div>
        </div>
         <div class="row justify-content-center mb-5">
            <div id="session" class="col-12 mb-3">
                <h1><u>4. Study session</u></h1>
            </div>
            <div class="col-12">
                <img src="../assets/fullstudy.png" style="max-width: 75rem"/>
            </div>
        </div>
         <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>A. Study session: locus item:</b></h4>
                </div>
            </div>
            <div class="row ml-5">
                <p>Locus item contains text description on top and one image on bottom.</p>
            </div>
        </div>
         <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>B. Study session: study item:</b></h4>
                </div>
            </div>
            <div class="row ml-5">
                <p>Study item contains text description on top and up to 3 images on bottom.</p>
            </div>
        </div>
         <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>C. Study session: controls:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/studyfirstscreen.png" style="max-width: 75rem"/>
            </div>
        </div>
        <div class="row mb-5 justify-content-left">
            <div class="col-10 mb-3">
                <div class="row ml-3">
                    <h4><b>D. Study session:review controls:</b></h4>
                </div>
            </div>
            <div class="row ml-3">
                <img src="../assets/reviewcontrols.png" style="max-width: 75rem"/>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "tutorial",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>