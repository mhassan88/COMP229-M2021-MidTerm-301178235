/**File Name: books.ts
 * Author Name: Muhammad Hassan
 * Student ID: 301178235
 * Favourite Books App
 */

import mongoose from "mongoose";
const Schema = mongoose.Schema; // Schema alias

// create a model class
const BookSchema = new Schema(
  {
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String,
  },
  {
    collection: "books",
  }
);

const Model = mongoose.model("Book", BookSchema);
export default Model;
