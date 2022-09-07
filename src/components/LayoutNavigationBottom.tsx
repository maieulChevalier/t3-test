import BottomNavigation from "@/components/NavigationBottom";

export default function BottomNavigationLayout({ children }: any) {
  return (
    <>
      <main>{children}</main>
      <BottomNavigation />
    </>
  );
}
