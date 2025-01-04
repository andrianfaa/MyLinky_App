import { Schema } from "mongoose";

export default () =>
  <T>(schema: Schema<T>) => {
    schema.set("toJSON", {
      virtuals: true,
      transform: (_, data) => {
        const id = data._id;

        delete data._id;
        delete data.__v;

        if (data.password) {
          delete data.password;
        }

        return {
          id,
          ...data
        };
      }
    });
  };
