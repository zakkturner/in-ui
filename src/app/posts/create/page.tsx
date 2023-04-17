"use client";

import Editor from "@/components/ui/RTE/Slate";
import { useState, useContext, FormEvent } from "react";
import axios from "axios";

import { UrlContext } from "@/context/UrlContext";
import { useAppSelector } from "@/app/hooks";
import { getCsrfToken } from "@/store/features/user/userSlice";

const CreatePage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const url = useContext(UrlContext);
  const csrf: any = useAppSelector(getCsrfToken);
  const handleFile = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(selectedFile);
      formData.append("title", title);
      formData.append("body", body);
      formData.append("image", selectedFile as File);
      console.log(formData);
      const post = await axios
        .post(`${url}/api/post`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-XSRF-TOKEN": csrf,
          },
        })
        .then((response) => {
          console.log(response);
          setTitle("");
          setBody("");
          setSelectedFile(null);
        });
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex w-8/12 mx-auto justify-between h-screen">
      <div className="py-10 w-1/2 h-fit my-2 mx-auto bg-white">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col px-6">
            <label htmlFor="title" className="py-2 uppercase">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="bg-[#c9c9c9]"
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mb-12 px-6">
            <label htmlFor="body" className="py-2 uppercase">
              Body
            </label>
            <textarea
              cols={30}
              rows={10}
              className="bg-[#c9c9c9]"
              onChange={(e: any) => {
                setBody(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="flex flex-col mb-12 px-6">
            <label htmlFor="body" className="py-2 uppercase">
              Body
            </label>

            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className=""
              onChange={handleFile}
            />
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
