import type { RefType, Types } from "mongoose";

export type TUserSchema = {
  id?: Types.ObjectId;
  uid?: string;
  name: string;
  username: string;
  email: string;
  password: string | null;
  avatar?: string | null;
  loginWith?: "email" | "google";
  role?: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};

export type TLinkySchema = {
  id?: Types.ObjectId;
  uid?: RefType<TUserSchema>;
  siteName: string;
  siteDescription: string;
  links: {
    id: string;
    url: string;
    title?: string;
    description?: string;
    type?: "link";
    icon?: string; // Default: "link"
    isPublished: boolean;
  };
  createdAt: string;
  updatedAt: string;
};

// export type TSettingSchema = {
//   id?: Types.ObjectId;
//   uid?: RefType<TUserSchema>;
//   generalSettings: {
//     profile: RefType<TUserSchema>;
//     theme: {
//       primaryColor: string;
//       secondaryColor: string;
//       darkMode: boolean;
//     };
//   };
//   publishSettings: {
//     profile: {
//       showProfilePhoto: boolean;
//       showProfileName: boolean;
//       showProfileEmail: boolean;
//       showProfileBio: boolean;
//     };
//     site: {
//       showSiteName: boolean;
//       showSiteDescription: boolean;
//     };
//     link: {
//       showLinkTitle: boolean;
//       showLinkDescription: boolean;
//       showLinkIcon: boolean;
//     };
//   };
//   createdAt: string;
//   updatedAt: string;
// };
