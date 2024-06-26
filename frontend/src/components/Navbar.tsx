"use client";
import Image from "next/image";
import React from "react";

const Navbar = () => {
	return (
		<nav className="border-b">
			<div className="max-w-5xl mx-auto flex items-center justify-between">
				<div className="flex items-center">
					<Image src="/logo.png" alt="logo" width="64" height="64" />
					<span className="text-xl text-semibold tracking-tight">
						BookKeeper
					</span>
				</div>
				<div className="flex gap-4">
					<button className="h-10 rounded-md border border-primary-500 px-4 py-2 text-sm font-medium text-primary-500 transition-all hover:border-primary-100 hover:bg-primary-100 active:border-primary-200 active:bg-primary-200">
						Sign In
					</button>
					<button className="h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 active:bg-primary-700">
						Sign Up
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
