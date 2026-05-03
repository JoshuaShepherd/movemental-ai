import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AudiencePage } from './pages/AudiencePage';
import { AboutPage } from './pages/AboutPage';
import { AssessPage } from './pages/AssessPage';
import { MovementLeadersPage } from './pages/MovementLeadersPage';
import { TeamPage } from './pages/TeamPage';
import { VoicesPage } from './pages/VoicesPage';
import { ContactPage } from './pages/ContactPage';
import { WorkWithUsPage } from './pages/WorkWithUsPage';
import { StartWithSafetyPage } from './pages/StartWithSafetyPage';
import { EvidencePage } from './pages/EvidencePage';
import { CookiesPage } from './pages/CookiesPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { FaqPage } from './pages/FaqPage';
import { WhoWeServePage } from './pages/WhoWeServePage';
import { FieldGuidePage } from './pages/FieldGuidePage';
import { LibraryPage } from './pages/LibraryPage';
import { PathwayOverviewPage } from './pages/PathwayOverviewPage';

import { FoundationsPage } from './pages/pathway/FoundationsPage';
import { LabPage } from './pages/pathway/LabPage';
import { TrainingPage } from './pages/TrainingPage';
import { TechnologyPage } from './pages/TechnologyPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route element={<Layout />}>
           <Route path="/" element={<HomePage />} />
           <Route path="/pathway" element={<PathwayOverviewPage />} />
           <Route path="/pathway/foundations" element={<FoundationsPage />} />
           <Route path="/pathway/lab" element={<LabPage />} />
           <Route path="/training" element={<TrainingPage />} />
           <Route path="/technology" element={<TechnologyPage />} />
           <Route path="/for-churches" element={<AudiencePage audience="churches" />} />
           <Route path="/for-nonprofits" element={<AudiencePage audience="nonprofits" />} />
           <Route path="/for-institutions" element={<AudiencePage audience="institutions" />} />
           <Route path="/churches" element={<AudiencePage audience="churches" />} /> {/* Redirect/legacy */}
           <Route path="/nonprofits" element={<AudiencePage audience="nonprofits" />} /> {/* Redirect/legacy */}
           <Route path="/institutions" element={<AudiencePage audience="institutions" />} /> {/* Redirect/legacy */}
           <Route path="/about" element={<AboutPage />} />
           <Route path="/assess" element={<AssessPage />} />
           <Route path="/movement-leaders" element={<MovementLeadersPage />} />
           <Route path="/team" element={<TeamPage />} />
           <Route path="/voices" element={<VoicesPage />} />
           <Route path="/contact" element={<ContactPage />} />
           <Route path="/work-with-us" element={<WorkWithUsPage />} />
           <Route path="/start-with-safety" element={<StartWithSafetyPage />} />
           <Route path="/evidence" element={<EvidencePage />} />
           <Route path="/library" element={<LibraryPage />} />
           <Route path="/cookies" element={<CookiesPage />} />
           <Route path="/privacy" element={<PrivacyPage />} />
           <Route path="/terms" element={<TermsPage />} />
           <Route path="/faq" element={<FaqPage />} />
           <Route path="/who-we-serve" element={<WhoWeServePage />} />
           <Route path="/field-guide" element={<FieldGuidePage />} />
         </Route>
      </Routes>
    </BrowserRouter>
  );
}

