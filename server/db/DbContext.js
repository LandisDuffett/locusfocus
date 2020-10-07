import mongoose from "mongoose";
import LocusSchema from "../models/Locus";
import ProfileSchema from "../models/Profile";
import StudylistSchema from '../models/Studylist';
import SessionlistSchema from "../models/Sessionlist";
import StudyitemSchema from "../models/Studyitem";

class DbContext {
  Loci = mongoose.model("Locus", LocusSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Studylists = mongoose.model("Studylist", StudylistSchema);
  Sessionlists = mongoose.model("Sessionlist", SessionlistSchema);
  Studyitems = mongoose.model("Studyitem", StudyitemSchema);


}

export const dbContext = new DbContext();
