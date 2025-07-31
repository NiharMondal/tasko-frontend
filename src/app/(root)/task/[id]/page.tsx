import React from "react";

import Description from "./description";
import NotFound from "@/app/not-found";
import { TResponse, TTodo } from "@/types";

const fetchSingleTask = async (
	id: string
): Promise<TResponse<TTodo> | undefined> => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`,
			{ cache: "no-store" }
		);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default async function TaskDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const data = await fetchSingleTask(id);

	return (
		<>{data?.result ? <Description task={data?.result} /> : <NotFound />}</>
	);
}
