import { requireAdmin } from '@/lib/auth';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin · Ephtopia Cleans CMS',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify admin session — redirects to /admin/login if not authenticated
  const user = await requireAdmin();

  return (
    <div
      className="h-screen h-[100dvh] bg-slate-100 flex overflow-hidden w-full max-w-full"
      style={{ fontFamily: 'var(--font-source-sans), system-ui, sans-serif' }}
    >
      <AdminShell user={user}>
        {children}
      </AdminShell>
    </div>
  );
}
