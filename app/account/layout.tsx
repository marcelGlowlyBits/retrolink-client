import { NavigationBar } from '@/common/layout/navigationBar';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    );
  }