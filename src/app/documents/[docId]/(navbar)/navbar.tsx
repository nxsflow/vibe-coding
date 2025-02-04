import DocumentInput from "./document-input";
import Menubar from "./menubar";
import Logo from "@/components/main/logo";

const Navbar = () => (
  <nav className="flex items-center justify-between">
    <div className="flex gap-2 items-center">
      <Logo />
      <div className="flex flex-col">
        <DocumentInput />
        <Menubar />
      </div>
    </div>
  </nav>
);

export default Navbar;
