"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginFetch } from "@/redux/modules/user/userSlice";

export default function Home() {
	const user = useAppSelector((state) => state.user);
	const [isClient, setIsClient] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<>
			{isClient && (
				<main className="flex min-h-screen flex-col items-center justify-between p-24">
					<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
						<h1>Hello World</h1>

						{user.user.id !== 0 ? (
							<div>
								<h1>{user.user.id}</h1>
								<h1>{user.user.username}</h1>
								<h1>{user.token}</h1>
							</div>
						) : (
							<h1>Não tem usuário</h1>
						)}

						<button
							onClick={() => {
								dispatch(loginFetch({ id: 6, username: "admin" }));
							}}
						>
							Clica ai
						</button>

						<h1>{user.isLoading ? "Carregando..." : "Não está carregando"}</h1>
					</div>
					<div>
						<h3>NAVIGATIONS</h3>
						<ul>
							<li>
								<Link href="/page2">Page2</Link>
							</li>
							<li>
								<Link href="/page3">Page3</Link>
							</li>
						</ul>
					</div>
				</main>
			)}
		</>
	);
}
