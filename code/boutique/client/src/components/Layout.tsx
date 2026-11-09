import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <nav style={{ background: "#37474f" }}>
        <strong>Boutique</strong>
        <NavLink to="/documents">Document</NavLink>
        <NavLink to="/clients">Client</NavLink>
        <NavLink to="/commandes">Commande</NavLink>
        <NavLink to="/lignedecommandes">LigneDeCommande</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
