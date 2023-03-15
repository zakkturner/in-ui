import Image from "next/image";
import SideBarCard from "../Card/SideBarCard";
import PopularPosts from "../Post/PopularPosts/PopularPost";
const SideBar = () => {
  return (
    <SideBarCard>
      <div className="py-4 px-6">
        <div className="mb-2">
          <h4 className="uppercase text-sm font-bold">About Us</h4>
          <div className=" py-5">
            <Image
              className="w-full"
              src="/assets/images/aboutLogo.webp"
              alt="Interactive Nerd"
              width="150"
              height="50"
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
            ratione esse unde ad? Error quaerat maiores tenetur, velit dolorum
            rerum in nostrum, porro, veritatis sequi expedita vel illum fugit
            voluptatibus?
          </p>
        </div>
        <div className="mb-2">
          <h4 className="uppercase text-sm font-bold mb-5">Popular Posts</h4>
          <hr />
          <PopularPosts />
        </div>
        <div className="mb-2">
          <Image
            className="w-full"
            src="/assets/images/web-dev.jpeg"
            alt="Interactive Nerd"
            width="150"
            height="50"
          />
        </div>
        <div className="mb-2">
          <h4 className="uppercase text-sm font-bold mb-5">Tags</h4>
        </div>
      </div>
    </SideBarCard>
  );
};

export default SideBar;
