"use client";

import Link from "next/link";
import { useEffect } from "react";

import axiosInstance from "@/services/fetcher";

export default function Home() {
	useEffect(() => {
		console.log("Page2");

		(async () => {
			await axiosInstance.get("/users/");
		})();
	});
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Hello World</h1>
			<div>
				<h3>NAVIGATIONS</h3>
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/page3">Page3</Link>
					</li>
				</ul>
			</div>
		</main>
	);
}
