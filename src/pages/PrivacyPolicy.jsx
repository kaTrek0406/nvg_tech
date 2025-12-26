import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main style={{ minHeight: '100vh', padding: '120px 0 80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Politica de Confidențialitate</h1>

          <div style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Data ultimei actualizări:</strong> {new Date().toLocaleDateString('ro-RO')}
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              1. Introducere
            </h2>
            <p style={{ marginBottom: '16px' }}>
              NVG Tech ("noi", "nostru" sau "compania") respectă confidențialitatea dvs. și se angajează să protejeze datele personale pe care le colectăm prin intermediul site-ului nostru nvg.md ("Site").
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              2. Informații pe care le colectăm
            </h2>
            <p style={{ marginBottom: '16px' }}>Colectăm următoarele tipuri de informații:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Nume și prenume</li>
              <li style={{ marginBottom: '8px' }}>Număr de telefon</li>
              <li style={{ marginBottom: '8px' }}>Adresă de email (dacă este furnizată)</li>
              <li style={{ marginBottom: '8px' }}>Mesaj sau cerere trimisă prin formular</li>
              <li style={{ marginBottom: '8px' }}>Date tehnice (adresă IP, browser, dispozitiv)</li>
            </ul>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              3. Cum utilizăm informațiile
            </h2>
            <p style={{ marginBottom: '16px' }}>Utilizăm datele dvs. personale pentru:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>A răspunde la întrebările și cererile dvs.</li>
              <li style={{ marginBottom: '8px' }}>A vă furniza serviciile solicitate</li>
              <li style={{ marginBottom: '8px' }}>A îmbunătăți experiența utilizatorului pe site</li>
              <li style={{ marginBottom: '8px' }}>A trimite comunicări de marketing (numai cu consimțământul dvs.)</li>
            </ul>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              4. Partajarea informațiilor
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Nu vindem, nu schimbăm și nu transferăm datele dvs. personale către terțe părți fără consimțământul dvs., cu excepția cazurilor prevăzute de lege sau necesare pentru furnizarea serviciilor (de exemplu, furnizori de servicii de hosting sau procesare plăți).
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              5. Cookie-uri și tehnologii similare
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Site-ul nostru utilizează cookie-uri și Meta Pixel pentru a analiza traficul și a îmbunătăți performanța site-ului. Puteți dezactiva cookie-urile din setările browser-ului dvs.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              6. Securitatea datelor
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Luăm măsuri tehnice și organizaționale adecvate pentru a proteja datele dvs. personale împotriva accesului neautorizat, pierderii sau modificării.
            </p>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              7. Drepturile dvs.
            </h2>
            <p style={{ marginBottom: '16px' }}>Aveți dreptul să:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Accesați datele personale pe care le deținem despre dvs.</li>
              <li style={{ marginBottom: '8px' }}>Solicitați corectarea sau ștergerea datelor</li>
              <li style={{ marginBottom: '8px' }}>Vă opuneți prelucrării datelor</li>
              <li style={{ marginBottom: '8px' }}>Retrageți consimțământul în orice moment</li>
            </ul>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              8. Contact
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Pentru întrebări legate de această Politică de Confidențialitate, vă rugăm să ne contactați:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Email: hello@nvg.md</li>
              <li style={{ marginBottom: '8px' }}>Telefon: +373 68 614 535</li>
              <li style={{ marginBottom: '8px' }}>Website: nvg.md</li>
            </ul>

            <h2 style={{ fontSize: '28px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
              9. Modificări ale politicii
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Ne rezervăm dreptul de a actualiza această Politică de Confidențialitate. Modificările vor fi publicate pe această pagină cu data actualizării.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
