import mongoose from "mongoose";
import LocuslistSchema from "../models/Locuslist";
import ProfileSchema from "../models/Profile";
import StudylistSchema from '../models/Studylist';
import SessionlistSchema from "../models/Sessionlist";
import StudyitemSchema from "../models/Studyitem";

class DbContext {
  Locuslists = mongoose.model("Locuslist", LocuslistSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Studylists = mongoose.model("Studylist", StudylistSchema);
  Sessionlists = mongoose.model("Sessionlist", SessionlistSchema);
  Studyitems = mongoose.model("Studyitem", StudyitemSchema);


}

export const dbContext = new DbContext();
