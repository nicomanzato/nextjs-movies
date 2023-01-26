import 'twin.macro';

import type styledImport from 'styled-components';

declare module 'twin.macro' {
  const styled: typeof styledImport;
}
