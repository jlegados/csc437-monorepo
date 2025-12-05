// packages/server/src/services/merchant-svc.ts
import { MerchantModel } from "../models/merchant";

export function list(userid: string) {
  return MerchantModel.find({ userid }).lean();
}

export function get(id: string, userid: string) {
  return MerchantModel.findOne({ _id: id, userid }).lean();
}

export function create(userid: string, data: any) {
  return MerchantModel.create({ userid, ...data });
}

export function update(id: string, userid: string, data: any) {
  return MerchantModel.findOneAndUpdate(
    { _id: id, userid },
    data,
    { new: true }
  ).lean();
}

export function remove(id: string, userid: string) {
  return MerchantModel.findOneAndDelete({ _id: id, userid }).lean();
}
