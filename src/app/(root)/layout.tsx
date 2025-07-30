import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return <section className="relative">{children}</section>;
}
