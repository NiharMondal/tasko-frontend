import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type TItems = {
	label: string;
	value: string;
};

type ChooseProps = {
	triggerValue: string;
	items: TItems[];
	setValue: React.Dispatch<React.SetStateAction<string>>;
};
export function Choose({ triggerValue, items, setValue }: ChooseProps) {
	return (
		<Select onValueChange={(value) => setValue(value)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder={triggerValue} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{items.map((item) => (
						<SelectItem value={item.value} key={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
