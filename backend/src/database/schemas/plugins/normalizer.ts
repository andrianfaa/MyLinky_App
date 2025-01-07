import { Schema } from "mongoose";

export default () =>
  <T>(schema: Schema<T>) => {
    schema.set("toJSON", {
      virtuals: true,
      transform: (_, data) => {
        if (data._id) {
          data.id = data._id;
        } else {
          delete data.id;
        }

        delete data._id;
        delete data.__v;

        if (data.password) {
          delete data.password;
        }

        return data;
      }
    });
  };
