import RootPage from './components/RootPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courtney Wong - Concept Artist',
  description: 'Explore the art portfolio of Courtney Wong.'
}

export default function Page() {
  return <RootPage />
}