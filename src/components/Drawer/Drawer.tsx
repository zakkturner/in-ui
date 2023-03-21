import { User } from "@/store/features/user/userSlice";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
const Drawer = ({ user }: { user: User }) => {
  return (
    <div className=" bg-white min-h-screen w-2/12 shadow-sm">
      <div className="py-2 px-6 border-b border-gray text-center">
        Hello, {user?.name}
      </div>
      <ul className="py-2 px-6">
        <li>
          <span className="flex justify-between items-center py-2">
            Posts <FaAngleRight />
          </span>
        </li>
        <li>
          <span className="flex justify-between items-center">
            Settings <FaAngleRight />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
