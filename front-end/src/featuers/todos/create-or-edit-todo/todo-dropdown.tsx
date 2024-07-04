"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  disabled?: boolean;
  property: "Priority" | "Status";
  arrValues: string[];

  onValueChange: (e: string) => void;
  defaultValue: string;
}

function TodoDropDowns({
  property,
  defaultValue,
  onValueChange,
  arrValues,

  disabled = false,
}: Props) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={!!disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={`update ${property.toLowerCase()}`} /* defaultValue={defaultValue} */
        />
      </SelectTrigger>

      <SelectContent className="">
        {/* <SelectItem value={defaultValue}>
          {defaultValue}
        </SelectItem> */}
        {arrValues.map((key) => (
          <SelectItem key={key} value={key}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { TodoDropDowns };
