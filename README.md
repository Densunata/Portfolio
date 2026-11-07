# Raiden A. Victor — Developer Portfolio

Personal portfolio for **Raiden A. Victor, Programmer / System Developer**. It's a frontend-only, content-driven single-page app.

> **Status:** Phase 4 (all pages and deployment readiness). Every route is implemented. The site is live at <https://victor-portfolio-dusky-eight.vercel.app> on Vercel, and every push to `main` deploys to production (see [docs/deployment.md](docs/deployment.md)).

## Tech stack

| Concern   | Choice                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| Framework | React 19, TypeScript 6 (strict), Vite 8                                       |
| Styling   | Tailwind CSS 4, shadcn/ui (`radix-nova` style), Geist Variable font           |
| Routing   | React Router 8 (data router: `createBrowserRouter`)                           |
| Motion    | Motion (`LazyMotion` + `m`), global `reducedMotion="user"`                    |
| Icons     | Lucide React                                                                  |
| Testing   | Vitest 5, React Testing Library, jest-dom, jsdom                              |
| Quality   | ESLint 10 (typescript-eslint strict type-checked), Prettier + Tailwind plugin |

## Getting started

Requires **Node.js 22.12+** (developed on Node 24).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Commands

| Command             | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Start the dev server                                      |
| `npm run build`     | Type-check and build to `dist/`                           |
| `npm run preview`   | Serve the production build locally                        |
| `npm run typecheck` | `tsc -b` across app and tooling configs                   |
| `npm run lint`      | ESLint (`lint:fix` to autofix)                            |
| `npm run format`    | Prettier write (`format:check` to verify)                 |
| `npm test`          | Run Vitest once (`test:watch` for watch mode)             |
| `npm run check`     | All of the above in sequence. Run this before committing. |

## Folder structure

```
victor-portfolio/
├── app/                    Application code
│   ├── src/                React + TypeScript source (@/ alias): app, components, features, content, …
│   └── public/             Static files served at the site root (icons, og-image, images/, resume/)
├── config/
│   └── ai/                 AI assistant instructions (see config/ai/README.md)
│       ├── agents/         instructions.md: canonical project rules for all coding agents
│       └── claude/         CLAUDE.md: Claude Code entry point (imports the rules above)
├── docs/                   Architecture, content guide, deployment
├── .vscode/                Shared workspace settings and recommended extensions
├── CLAUDE.md               One-line pointer so Claude Code finds config/ai/claude/CLAUDE.md
├── index.html              Vite entry HTML (static SEO and social tags)
├── package.json            Scripts and dependencies
├── vite.config.ts          Vite (publicDir: app/public, @/ alias: app/src)
├── vitest.config.ts        Test runner (jsdom, app/src/**/*.test.ts(x))
├── tsconfig*.json          TypeScript (app and tooling projects)
├── eslint.config.js        ESLint flat config
├── .prettierrc.json        Prettier and Tailwind class sorting
└── components.json         shadcn/ui CLI config
```

Generated folders (`node_modules/`, `dist/`, `coverage/`) are git-ignored and hidden in VS Code.

## Documentation

| Document                                                             | Covers                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md)                         | Source layout, routes, conventions, SEO, architecture decisions     |
| [docs/content-guide.md](docs/content-guide.md)                       | Editing content: projects, case studies, screenshots, resume, links |
| [docs/deployment.md](docs/deployment.md)                             | Build settings, required SPA rewrite per host, pre-launch checks    |
| [config/ai/README.md](config/ai/README.md)                           | How AI assistants load the project instructions                     |
| [config/ai/agents/instructions.md](config/ai/agents/instructions.md) | Coding rules for people and agents                                  |

## VS Code

Open the folder and accept the recommended extensions (ESLint, Prettier, Tailwind CSS IntelliSense, Vitest). The workspace settings format on save with Prettier, apply ESLint fixes, and use the project's TypeScript version. Related files are nested in the explorer: tests under their component, `tsconfig.*.json` under `tsconfig.json`, and `package-lock.json` under `package.json`.
