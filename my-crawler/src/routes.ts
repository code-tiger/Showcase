import { Dataset, createCheerioRouter, Request } from "crawlee";

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, request }) => {
  const { loadedUrl } = request;

  await enqueueLinks({
    globs: [`${loadedUrl}/**`],
    label: "detail",
  });
});

router.addHandler("detail", async ({ request, $, log }) => {
  const title = $("title").text();

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
  });
});
