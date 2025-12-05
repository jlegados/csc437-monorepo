import { CategoryModel } from "../models/category";

function list(userid: string) {
  return CategoryModel.find({ userid }).lean();
}

function create(userid: string, data: any) {
  return CategoryModel.create({ userid, ...data });
}

export default { list, create };
