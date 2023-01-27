import { Item } from '@radix-ui/react-toggle-group';
import tw, { css, styled, theme } from 'twin.macro';

export const StyledToogleGroupItem = styled(Item)(() => [
  tw`
  h-12
  bg-gray-100
  select-none
  px-4
  [.data-state]:(bg-red-300)
  hover:(
    bg-gray-200
  )
  first-of-type:(
    rounded-tl-2xl
    rounded-bl-2xl
  )
  last-of-type:(
    rounded-tr-2xl
    rounded-br-2xl
  )
`,
  css`
    &[data-state='on'] {
      background-color: ${theme`colors.gray.300`};
    }
  `,
]);
