import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobApplicationsRedirectPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/admin/applications?job=${id}`);
}
