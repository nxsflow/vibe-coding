import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 36, height = 36 }) => {
  return (
    <Link href="/">
      <Image src="/logo.svg" alt="Logo" {...{ width, height }} />
    </Link>
  );
};

export default Logo;
