# Public discovery policy

The canonical origin is https://www.dingerzone.com, matching existing public links. Domain redirect and hosting crawler access must be verified on deployment; this change does not configure DNS or hosting.

## Indexing

- Index: home, examples index, curated example detail pages, trial upload entry, getting-started guide, support, privacy, terms.
- Noindex, nofollow: /shared/[shareId], /try/[shareId], /subscription-success, /subscription-cancel.
- Only explicitly approved public routes appear in the sitemap. No personal result URLs are included.
- Result pages remain crawlable so engines can read noindex metadata. Neither noindex nor robots.txt replaces authorization or expiry checks.
- General crawlers and OAI-SearchBot may access public pages; /api/ is disallowed. Training permissions are a separate policy; no GPTBot-specific change is introduced.

## Publishing

Use pageMetadata for public page titles, descriptions, canonicals, and social previews. Keep claims consistent with shipped features. Curated examples include server-rendered explanatory text and VideoObject/BreadcrumbList data. Do not publish personal result records as discovery content. Add sitemap entries only after approving a page for public indexing. Do not synthesize last-modified dates on every request.

## Deployment verification and measurement

1. Verify apex/noncanonical hosts redirect to the canonical origin without chains.
2. Check /robots.txt and /sitemap.xml return successful responses and correct content types.
3. Inspect initial HTML for unique metadata, FAQ answers, all audience benefits, valid JSON-LD, and result noindex directives.
4. Verify hosting protections allow legitimate search crawlers on public pages.
5. Submit the sitemap in Google Search Console and Bing Webmaster Tools; inspect representative public URLs.
6. Establish monthly baselines for indexed pages, search impressions/clicks, identifiable AI referrals, trial starts/completions, and App Store clicks using existing analytics. Referral data undercounts visits without a referrer; manual AI citation checks are directional rather than ranking guarantees.

External dashboard setup and production checks are follow-up tasks requiring account access and deployment. Dedicated audience/pricing pages and reviewed educational content belong to later releases; validate pricing and entitlement claims before publishing them.
