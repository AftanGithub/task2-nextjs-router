import Link from "next/link";
import DropdownUser from "./DropdownUser";
import { PlaneTakeoffIcon } from "lucide-react";

const Header = () => {
 
  return (
    <header className="sticky top-0 z-999 flex w-50 bg-white shadow-sm">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          <Link className="block flex-shrink-0 flex" href="/">
             <PlaneTakeoffIcon />
            <h3 className="mx-2">Flight App</h3>
          </Link>
        </div>
        <div className="flex items-end gap-3 2xsm:gap-7">
          <DropdownUser />
        
        </div>
      </div>
    </header>
  );
};

export default Header;
