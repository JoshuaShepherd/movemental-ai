import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SceniusGraph } from '@/components/scenius/scenius-graph';

export default function SceniusVisualizationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sage-950">
      <Navigation />
      <main className="flex-grow">
        <SceniusGraph />
      </main>
      <Footer />
    </div>
  );
}
