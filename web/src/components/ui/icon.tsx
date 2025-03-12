import { type LucideProps, Menu, Moon, Sun, X } from "lucide-react";

const IconsList = {
  Sun,
  Moon,
  X,
  Menu,
};

export type IconName = keyof typeof IconsList;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = IconsList[name];

  return <LucideIcon {...props} />;
};
