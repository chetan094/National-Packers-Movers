import { notFound } from 'next/navigation';
import { branchesData } from '@/data/branchesData';
import BranchPage from '@/components/BranchPage/BranchPage';

// Enable static generation for all state routes at build time
export async function generateStaticParams() {
  return Object.keys(branchesData.states).map((state) => ({
    state: state,
  }));
}

// Generate dynamic SEO metadata per state
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state;
  const stateData = branchesData.states[stateSlug];

  if (!stateData) {
    return {
      title: 'Branch Not Found | National Packers & Movers',
      description: 'The requested state branch directory could not be located.',
    };
  }

  return {
    title: stateData.title,
    description: stateData.description,
    keywords: stateData.keywords,
    alternates: {
      canonical: `https://thenationalpackersmovers.com/branches/${stateSlug}`,
    },
    openGraph: {
      title: stateData.title,
      description: stateData.description,
      type: 'website',
      url: `https://thenationalpackersmovers.com/branches/${stateSlug}`,
    },
  };
}

export default async function StateBranchPage({ params }) {
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state;
  const stateData = branchesData.states[stateSlug];

  if (!stateData) {
    notFound();
  }

  return <BranchPage data={stateData} isCity={false} />;
}
