import { TZDate } from "@date-fns/tz";
import { Schema } from "mongoose";
import { TLinkySchema } from "./types";

const LinkySchema = new Schema<TLinkySchema>({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  siteName: {
    type: String,
    required: true
  },
  siteDescription: {
    type: String,
    required: true
  },
  links: [
    {
      id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: () => null
      },
      description: {
        type: String,
        default: () => null
      },
      type: {
        type: String,
        default: () => "link"
      },
      icon: {
        type: String,
        default: () => "link"
      },
      isPublished: {
        type: Boolean,
        default: () => true
      }
    }
  ],
  createdAt: {
    type: String,
    immutable: true,
    default: () => new TZDate(new Date(), "Asia/Jakarta").toISOString()
  },
  updatedAt: {
    type: String,
    default: () => new TZDate(new Date(), "Asia/Jakarta").toISOString()
  }
});

LinkySchema.pre("save", function (next) {
  if (!this.isNew) {
    this.set("updatedAt", new TZDate(new Date(), "Asia/Jakarta").toISOString());

    next();
    return;
  }

  next();
});

export default LinkySchema;
