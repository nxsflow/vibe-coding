import { type ColorResult, SketchPicker } from "react-color";
import ToolbarDropdown from "./toolbar-dropdown";
import ToolbarDropdownTrigger from "./toolbar-dropdown-trigger";
import ToolbarDropdownContent from "./toolbar-dropdown-content";
import { FC, ReactNode } from "react";

interface Props {
  currentColor: string;
  onChange: (color: ColorResult) => void;
  children: ReactNode;
}

const ToolbarColorPicker: FC<Props> = ({
  children,
  currentColor,
  onChange,
}) => (
  <ToolbarDropdown>
    <ToolbarDropdownTrigger
      className="min-w-7 flex-col justify-center"
      hideChevron
    >
      {children}
    </ToolbarDropdownTrigger>
    <ToolbarDropdownContent className="p-0">
      <SketchPicker color={currentColor} onChange={onChange} />
    </ToolbarDropdownContent>
  </ToolbarDropdown>
);

export default ToolbarColorPicker;
