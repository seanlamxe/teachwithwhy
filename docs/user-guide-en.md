# TeachWithWhy — User Guide

Version 0.2 · 2026-11-03 · Designed primarily for desktop use

## What does it do?

Start with a classroom participation or discussion challenge, understand the evidence behind a teaching strategy, adapt an activity to practical constraints, and return with observations. The tool covers lower and upper primary, junior secondary and senior secondary in Hong Kong.

## Start in three minutes

1. Open the single website URL. Use the top-right English / 繁體中文 button to switch in place without changing the URL. Your browser remembers the language choice.
2. Choose a scenario on the workspace or select **New activity**.
3. Enter the year group, subject, class size, activity length, topic, challenge and goal.
4. Select practical constraints: keeping seats in place, no electronic devices, or language support.
5. Compare strategies. Read each source’s findings, scope and limitations.
6. Try **View a rule-based sample** first. On an enabled deployment, choose **Design with live AI**.
7. Edit the steps and notes, then **Save activity** or **Print / save as PDF**.
8. After teaching, open **My teaching trials → Classroom reflection** and record observations, difficulties and next steps.

## Upper-primary example

- Year group: upper primary; subject: language; class size: 30; activity: 12 minutes.
- Topic: a character’s choices.
- Challenge: a few pupils dominate answers.
- Goal: each pupil prepares an idea and a reason for the character’s choice.
- Strategy: Think, then share.
- Support: keywords, drawings or rehearsal with a partner.

Observe whether pupils prepared their own ideas and offered reasons, rather than only recording that the atmosphere was positive.

## Junior-secondary example

- Year group: junior secondary; subject: science; class size: 32; activity: 15 minutes.
- Topic: comparing two scientific explanations.
- Goal: compare evidence and identify remaining uncertainty.
- Strategy: Give an idea and a reason.
- Preparation: provide teacher-checked phenomena or source materials.

Lower-primary pupils may use pointing, drawings or short sentences. Senior-secondary activities may compare assumptions, counterexamples and evidence. Year group does not determine an individual pupil’s needs.

## Samples versus real AI

**Rule-based samples** use fixed strategies and rules for age and timing. They make no model calls and are explicitly labelled as samples.

**Live AI** runs through the website backend. DeepSeek mode calls its Search API, filters sources and asks the model to adapt an activity. The optional OpenAI mode uses Responses API web search and labels title-only discoveries as metadata pointers. Teachers must still review every output.

Completed AI activities identify the model, generation time and retrieval status. A failed call shows an error; it is never silently replaced with a template presented as AI.

Live search does not guarantee newly published or well-matched research on every request. Titles, snippets, summaries and full texts provide different levels of evidence. The output is not a systematic review or a validated intervention.

## Using AI

1. Check the service status in the top bar.
2. Once the owner has configured the service, obtain a teacher pilot code.
3. Enter it in **About & connection**. This is not a model API key.
4. Confirm the data-processing consent option in classroom settings.
5. Choose **Design with live AI** and wait for retrieval and generation.
6. Review sources, content and timing before using the activity.

When AI is not configured, samples, editing, browser storage, printing and reflections remain available. A configured status is not a successful live connection test.

## What is sent to external services?

AI mode sends the submitted class context, challenge and goal to the configured model. Reflection AI additionally sends the reflection you choose to submit, after confirmation. Search uses a general educational query without requiring pupil identities.

Do not enter pupil names, contact information, diagnostic reports or other identifying details. Check your institution’s requirements and provider data terms before formal use. Provider retention policies apply separately.

## Save, print and back up

- Records stay in this browser; they do not automatically sync across devices.
- Clearing browser data, private browsing or restricted storage can prevent records from persisting.
- **Print / save as PDF** opens the browser’s print dialog. Select its PDF destination.
- **My teaching trials** supports JSON export and import. Existing IDs are retained rather than silently overwritten.
- Deleting an activity also deletes its reflection. This cannot be undone within the app; download a backup first.
- Switching the interface language does not translate saved original content. Create a new activity for another output language.

## Troubleshooting

**AI not configured:** the owner needs a valid API key, available provider credit and a pilot code, followed by redeployment.

**Invalid pilot code:** re-enter the owner-provided code. It is held only for the current browser session.

**Invalid output or citation:** the result was not accepted. Try again later and verify any source before relying on it.

**Slow generation:** retrieval and reasoning take time. A timeout is shown explicitly. Repeated requests may incur additional provider charges; check the previous request’s status first.

**Does this prove learning gains?** No. A local observation does not establish causality or measure all learning outcomes.

## Site owners

See `README.md` and `docs/deployment.md` in the project. Store API keys only in private server-side environment variables, never in public GitHub, browser code or this guide. Hosted APIs are billed; open model weights do not make hosted inference free.

Official references: [DeepSeek API](https://api-docs.deepseek.com/) and [Search & Fetch](https://api-docs.deepseek.com/guides/search/).

## Renaming and existing records

The product is now TeachWithWhy · 教得有據. Backups from the previous product name are accepted. Existing browser records are read when updating at the same address. A new domain has separate browser storage: export at the old address and import at the new one.
