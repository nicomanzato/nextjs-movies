import 'twin.macro';
import styledImport, { CSSProp, css as cssImport } from 'styled-components';

import type styledImport from 'styled-components';

declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
