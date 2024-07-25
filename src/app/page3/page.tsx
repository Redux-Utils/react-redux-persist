import Link from "next/link";

import axiosInstance from "@/services/fetcher";

export default async function Home() {
	await axiosInstance.get("/todos/");

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
						<Link href="/page2">Page2</Link>
					</li>
				</ul>
			</div>
		</main>
	);
}
