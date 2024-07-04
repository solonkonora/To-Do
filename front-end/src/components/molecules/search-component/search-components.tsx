import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface SelectProps {
  disabled?: boolean; // weather or not select field is disabled;
  label: string;
  property: "priority" | "status";
  arrValues: string[];

  defaultValue: string;
  onValueChange: (e: string) => void;
}

function TodoQuerySelectDropDown({
  label,
  property,
  defaultValue,
  onValueChange,
  arrValues,

  disabled = false,
}: SelectProps) {
  return (
    <label htmlFor={label} className="p-0">
      <span className="font-semibold text-[0.875rem]">{label}</span>

      <Select
        onValueChange={onValueChange}
        disabled={!!disabled}
        defaultValue={defaultValue}
      >
        <SelectTrigger id={label} className="w-fit min-w-[120px]">
          <SelectValue placeholder={`updated ${property}`} />
        </SelectTrigger>
        <SelectContent className="">
          {arrValues.map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

export { TodoQuerySelectDropDown };
