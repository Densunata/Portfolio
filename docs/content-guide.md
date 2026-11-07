# Content guide

All site text lives in typed modules under `app/src/content/`. Components only render what they receive. Only add facts that the CV supports or that Raiden has confirmed. Never publish a phone number or street address.

| File                | Holds                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| `profile.ts`        | Name, title, tagline, summary, location, email, socials, resume, contact message |
| `projects.ts`       | Projects and their case studies                                                  |
| `experience.ts`     | Employment history                                                               |
| `skills.ts`         | Skill groups, competencies, "What I do" services                                 |
| `education.ts`      | Education                                                                        |
| `certifications.ts` | Certifications and training                                                      |
| `site.ts`           | Page titles, intros, and meta descriptions                                       |

`content.test.ts` checks that slugs and ids are unique, that links resolve, and that anything marked pending really is empty.

## Common tasks

- **Project:** append to `app/src/content/projects.ts` with a unique kebab-case `slug`.
- **Academic project:** set `academic: true` and `featured: false`. The project then appears under "Academic projects" on the homepage and the Projects page, instead of with personal and professional work.
- **Case study:** fill `caseStudy` (`overview`, plus optional `purpose`, `contributions`, `implementation`, `screenshots`). Sections without content are omitted from the page. Record unknown details in `caseStudy.pending`; this list is for maintainers and is never rendered. Set `experienceId` to link a related experience entry. The page then shows that entry's organization, engagement, and period, so they aren't duplicated.
- **Project in progress:** set `status` (shown on the card and in the project facts) and `caseStudy.developmentStatus`, which keeps `implemented` and `inDevelopment` work in separate lists. Unfinished items never get a completed check mark. Update both as the project progresses. Optional `projectType` replaces `category` in the "Type" fact, and `cardTech` is a shorter subset of `tech` for the card.
- **Technology groups:** optional `techGroups` splits `tech` under subheadings on the case study, such as Software and Hardware. The groups must cover all of `tech`; `content.test.ts` checks this.
- **Project without an experience entry:** set `organization` and `period` directly. `period` is shown as written, for example `School Year 2024–2025`.
- **Case-study layout:** optional `caseStudy.sections` replaces the default section order and can rename headings. List every section that has content; `content.test.ts` checks this. `caseStudy.features` adds a "Key features" section.
- **Case-study screenshots:** add files to `app/public/images/` and list them in `caseStudy.screenshots` with descriptive `alt` text, using paths like `/images/<file>`. Remove `'screenshots'` from `pending`.
- **Project card image:** add the file to `app/public/images/` and set `coverImage: '/images/<file>'`. Until then, the card has no image area and starts with the category and title.
- **Resume:** the public CV is `app/public/resume/Raiden-Victor-CV.pdf`, a redacted copy with no phone number or street address. The button shows "View My Resume", which opens the PDF in a new tab, plus a download icon link for the same file. To update it, replace the PDF with a new redacted export (check its text, not just how it looks). If `profile.resume.available` is set to `false`, the button shows a disabled "Resume coming soon" state and doesn't link anywhere.
- **GitHub:** add `{ platform: 'github', label: 'GitHub', href }` to `profile.socials`. It's hidden until a real URL is set.
- **Page title or description:** edit `app/src/content/site.ts`. If you change the site-wide description, update `index.html` too; a test checks they match.
- **UI primitive:** `npx shadcn@latest add <component>`. It's installed into `app/src/components/ui/`, via `components.json`.
