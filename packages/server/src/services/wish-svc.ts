import { WishModel } from "../models/wish";

function list(userid: string) {
  return WishModel.find({ userid }).lean();
}

function create(userid: string, data: any) {
  return WishModel.create({ userid, ...data });
}

export default { list, create };
