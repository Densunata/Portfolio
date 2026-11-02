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
- **Case study:** fill `caseStudy` (`overview`, plus optional `purpose`, `contributions`, `implementation`, `screenshots`). Sections without content are omitted from the page. Record unknown details in `caseStudy.pending`; this list is for maintainers and is never rendered. Set `experienceId` to link a related experience entry. The page then shows that entry's organization, engagement, and period, so they aren't duplicated.
- **Case-study screenshots:** add files to `app/public/images/` and list them in `caseStudy.screenshots` with descriptive `alt` text, using paths like `/images/<file>`. Remove `'screenshots'` from `pending`.
- **Project card image:** add the file to `app/public/images/` and set `coverImage: '/images/<file>'`. Until then, cards show a placeholder.
- **Resume:** add the redacted PDF as `app/public/resume/RaidenVictor-CV-Public.pdf`, then set `profile.resume.available = true`. Until then, the button shows "Resume coming soon" and doesn't link anywhere.
- **GitHub:** add `{ platform: 'github', label: 'GitHub', href }` to `profile.socials`. It's hidden until a real URL is set.
- **Page title or description:** edit `app/src/content/site.ts`. If you change the site-wide description, update `index.html` too; a test checks they match.
- **UI primitive:** `npx shadcn@latest add <component>`. It's installed into `app/src/components/ui/`, via `components.json`.
