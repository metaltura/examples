import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import DocumentListPage from './pages/DocumentListPage'
import DocumentDetailPage from './pages/DocumentDetailPage'
import DocumentNewPage from './pages/DocumentNewPage'
import DocumentEditPage from './pages/DocumentEditPage'
import ClientListPage from './pages/ClientListPage'
import ClientDetailPage from './pages/ClientDetailPage'
import ClientNewPage from './pages/ClientNewPage'
import ClientEditPage from './pages/ClientEditPage'
import CommandeListPage from './pages/CommandeListPage'
import CommandeDetailPage from './pages/CommandeDetailPage'
import CommandeNewPage from './pages/CommandeNewPage'
import CommandeEditPage from './pages/CommandeEditPage'
import LigneDeCommandeListPage from './pages/LigneDeCommandeListPage'
import LigneDeCommandeDetailPage from './pages/LigneDeCommandeDetailPage'
import LigneDeCommandeNewPage from './pages/LigneDeCommandeNewPage'
import LigneDeCommandeEditPage from './pages/LigneDeCommandeEditPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={null} />
        <Route path="/documents" element={<DocumentListPage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
        <Route path="/documents/new" element={<DocumentNewPage />} />
        <Route path="/documents/:id/edit" element={<DocumentEditPage />} />
        <Route path="/clients" element={<ClientListPage />} />
        <Route path="/clients/:id" element={<ClientDetailPage />} />
        <Route path="/clients/new" element={<ClientNewPage />} />
        <Route path="/clients/:id/edit" element={<ClientEditPage />} />
        <Route path="/commandes" element={<CommandeListPage />} />
        <Route path="/commandes/:id" element={<CommandeDetailPage />} />
        <Route path="/commandes/new" element={<CommandeNewPage />} />
        <Route path="/commandes/:id/edit" element={<CommandeEditPage />} />
        <Route path="/lignedecommandes" element={<LigneDeCommandeListPage />} />
        <Route path="/lignedecommandes/:id" element={<LigneDeCommandeDetailPage />} />
        <Route path="/lignedecommandes/new" element={<LigneDeCommandeNewPage />} />
        <Route path="/lignedecommandes/:id/edit" element={<LigneDeCommandeEditPage />} />
      </Route>
    </Routes>
  )
}
