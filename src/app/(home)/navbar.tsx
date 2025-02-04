import Logo from "@/components/main/logo";
import SearchInput from "./search-input";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Logo />
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div />
    </nav>
  );
};

export default Navbar;
