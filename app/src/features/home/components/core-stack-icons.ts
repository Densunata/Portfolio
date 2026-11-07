import {
  CSharpIcon,
  DotNetIcon,
  LaravelIcon,
  PostgreSQLIcon,
  ReactIcon,
  TypeScriptIcon,
} from '@/components/shared/brand-icons'
import type { IconComponent } from '@/components/shared/social-icons'

/** Logo shown beside each `profile.coreStack` entry, keyed by its exact label. */
export const coreStackIcons: Record<string, IconComponent> = {
  'C# / .NET': CSharpIcon,
  'ASP.NET Core': DotNetIcon,
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  Laravel: LaravelIcon,
  PostgreSQL: PostgreSQLIcon,
}
