export interface Profile {
  username: string;
  name: string;
  email: string;
}

export const defaultProfile: Profile = {
  username: "",
  name: "",
  email: ""
};
