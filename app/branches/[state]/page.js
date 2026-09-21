import { notFound } from 'next/navigation';
import { branchesData } from '@/data/branchesData';
import BranchPage from '@/components/BranchPage/BranchPage';
import { getCustomMetadata, getCustomerReviews } from '@/lib/supabase';

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

  const path = `/branches/${stateSlug}`;
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || stateData.title;
  const description = custom?.meta_description || stateData.description;
  const keywords = custom?.meta_keywords || stateData.keywords;
  const isNoindex = custom?.is_noindex ?? false;

  return {
    title,
    description,
    keywords,
    robots: {
      index: !isNoindex,
      follow: !isNoindex,
    },
    alternates: {
      canonical: `https://www.thenationalpackersmovers.com${path}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.thenationalpackersmovers.com${path}`,
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

  const liveReviews = await getCustomerReviews({ state_slug: stateSlug, status: 'approved', limit: 20 });

  return <BranchPage data={stateData} isCity={false} liveReviews={liveReviews} />;
}
