"use client";

import Editor from "@/components/ui/RTE/Slate";
import { useState } from "react";

const CreatePage = () => {
  return (
    <main className="flex w-8/12 mx-auto justify-between h-screen">
      <div className="py-10">
        <form>
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
          </div>
          <div className="flex flex-col mb-12">
            <label htmlFor="body">Body</label>
            <textarea cols="30" rows="10"></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#28aae2] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded uppercase"
          >
            Create Post
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePage;
