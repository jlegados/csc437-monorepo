import { GoalModel } from "../models/goal";

function list(userid: string) {
  return GoalModel.find({ userid }).lean();
}

function create(userid: string, data: any) {
  return GoalModel.create({ userid, ...data });
}

export default { list, create };
