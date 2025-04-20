// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import Shell from './shell';

export const metadata = {
  title: 'Radio Splice',
  description:
    'Radio Splice - take your show under the investigative microscope',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Shell>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
