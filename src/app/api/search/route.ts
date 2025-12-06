import { setup, gettingStarted, guides } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

const setupSearch = createFromSource(setup, { language: "english" });
const gettingStartedSearch = createFromSource(gettingStarted, { language: "english" });
const guidesSearch = createFromSource(guides, { language: "english" });

export async function GET(request: Request) {
  const url = new URL(request.url);
	const query = url.searchParams.get("query");
	if (!query) return Response.json([]);

	const [s1, s2, s3] = await Promise.all([
		setupSearch.search(query),
		gettingStartedSearch.search(query),
		guidesSearch.search(query),
	]);


	const merged = [...s1, ...s2, ...s3]


	return Response.json(merged);
};
