"use client";
import { Frown } from "lucide-react";

export default function ProductError() {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-69px-380px)]">
			<h1 className=" text-center italic text-gray-400 text-2xl flex gap-4">Product not found <Frown size={32}/></h1>
		</div>
	);
}