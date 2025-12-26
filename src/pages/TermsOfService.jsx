import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

export default function TermsOfService() {
  return (
    <>
      <Header />

      <main style={{ minHeight: '100vh', padding: '120px 0 80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Termeni și Condiții</h1>

          <div style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Data ultimei actualizări:</strong> {new Date().toLocaleDateString('ro-RO')}
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              1. Acceptarea termenilor
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Prin accesarea și utilizarea site-ului nvg.md ("Site"), acceptați să fiți legat de acești Termeni și Condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați Site-ul.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              2. Serviciile oferite
            </h2>
            <p style={{ marginBottom: '16px' }}>
              NVG Tech oferă următoarele servicii:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Dezvoltarea de magazine online (one-page și multi-page)</li>
              <li style={{ marginBottom: '8px' }}>Crearea și implementarea chatbot-urilor cu AI</li>
              <li style={{ marginBottom: '8px' }}>Servicii de publicitate targetată pe Facebook și Instagram</li>
              <li style={{ marginBottom: '8px' }}>Integrări CRM și automatizare</li>
            </ul>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              3. Prețuri și plăți
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Prețurile pentru serviciile noastre sunt indicate pe Site și pot fi modificate fără notificare prealabilă. Prețurile finale vor fi confirmate în contractul semnat între părți.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Plățile se efectuează conform condițiilor stabilite în contract. De regulă, se solicită un avans de 50% înainte de începerea lucrărilor.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              4. Drepturile de proprietate intelectuală
            </h2>
            <p style={{ marginBottom: '16px' }}>
              După plata integrală a serviciilor, toate drepturile de proprietate intelectuală asupra produsului final (cod sursă, design, conținut) vor fi transferate clientului, cu excepția cazurilor specificate altfel în contract.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              5. Garanții și suport
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Oferim suport tehnic gratuit pentru o perioadă de 1 lună după lansarea proiectului. Modificările minore (corecții de buguri, ajustări de text) sunt incluse în această perioadă.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Modificările majore sau cerințe noi vor fi facturate separat.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              6. Limitarea responsabilității
            </h2>
            <p style={{ marginBottom: '16px' }}>
              NVG Tech nu este responsabil pentru:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Pierderi de date cauzate de factori externi</li>
              <li style={{ marginBottom: '8px' }}>Probleme cu servicii terțe (hosting, domenii, platforme de plată)</li>
              <li style={{ marginBottom: '8px' }}>Rezultate de marketing sau vânzări (pentru serviciile de publicitate)</li>
              <li style={{ marginBottom: '8px' }}>Întreruperi ale serviciului din cauze de forță majoră</li>
            </ul>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              7. Confidențialitate
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Ne angajăm să păstrăm confidențialitatea informațiilor clienților. Pentru detalii, consultați{' '}
              <a href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                Politica de Confidențialitate
              </a>
              .
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              8. Rezilierea contractului
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Ambele părți pot rezilia contractul cu o notificare prealabilă de 7 zile. În cazul rezilierii din partea clientului, avansul plătit nu se returnează pentru munca deja efectuată.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              9. Modificări ale termenilor
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. Utilizarea continuă a Site-ului după modificări constituie acceptarea noilor termeni.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              10. Legea aplicabilă
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Acești termeni sunt guvernați de legislația Republicii Moldova. Orice litigii vor fi soluționate de instanțele competente din Moldova.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              11. Contact
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Pentru întrebări legate de acești Termeni și Condiții:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Email: hello@nvg.md</li>
              <li style={{ marginBottom: '8px' }}>Telefon: +373 68 614 535</li>
              <li style={{ marginBottom: '8px' }}>Website: nvg.md</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
