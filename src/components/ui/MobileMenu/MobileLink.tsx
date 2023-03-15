import Link from "next/link";
// import { FaAngleRight } from "react-icons/fa";

const MobileLink = ({
  name,
  url,
  needsAuth,
}: {
  name: string;
  url: string;
  needsAuth: boolean;
}) => {
  return (
    <li className="px-6 py-1 uppercase text-xs">
      <Link href={url} className="flex w-full justify-between">
        {name}
        {/* <FaAngleRight /> */}
      </Link>
    </li>
  );
};
export default MobileLink;
