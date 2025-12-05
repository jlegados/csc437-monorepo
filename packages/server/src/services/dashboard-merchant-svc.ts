import { MerchantModel } from "../models/merchant";

function list(userid: string) {
  return MerchantModel.find({ userid }).lean();
}

function create(userid: string, data: any) {
  return MerchantModel.create({ userid, ...data });
}

export default { list, create };
