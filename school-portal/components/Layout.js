// Example reusable component with comments
export default function Layout({ children }) {
  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ marginBottom: '20px' }}>
        <nav>
          <a href="/" style={{ marginRight: '10px' }}>Home</a>
          <a href="/db-status" style={{ marginRight: '10px' }}>DB Status</a>
          {/* Add more nav links here as you create pages */}
        </nav>
      </header>
      
      <main>
        {children}
      </main>

      <footer style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p>School Portal Demo</p>
      </footer>
    </div>
  )
}