import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { AppDispatch } from "@/store/store";
import { updateCurrentPath } from "@/store/features/navigation/navigationSlice";
import { usePathname } from "next/navigation";
import { isLoggedIn } from "@/store/features/user/userSlice";
const DesktopLink = ({
  name,
  url,
  needsAuth,
}: {
  name: string;
  url: string;
  needsAuth: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeStyles = { linkClass: "bg-[#28aae2] text-white " };
  const isLogged = useAppSelector(isLoggedIn);
  const pathName = usePathname();
  useEffect(() => {
    dispatch(updateCurrentPath(pathName));
  }, [dispatch, pathName]);

  return (
    <li className={`p-2 ${pathName === url ? activeStyles.linkClass : ""}`}>
      <Link href={`${url}`}>{name.toUpperCase()}</Link>
    </li>
  );
};

export default DesktopLink;
