import { Loader2 } from "lucide-react";

export default function ProductLoading() {
	return (
		<div className="c-page flex items-center justify-center">
			<Loader2 size={52} className="animate-spin text-gray-400" />
		</div>
	)
}
