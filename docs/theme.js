tailwind.config = {
  plugins: [
    ({ addComponents }) => {
      addComponents({

        '.doc-body': {
          backgroundColor: '#0d1117',
          color: '#e6edf3',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          WebkitFontSmoothing: 'antialiased',
        },

        '.doc-main': {
          maxWidth: '42rem',
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
        },

        '.doc-nav': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#161b22',
          borderBottom: '1px solid #30363d',
          padding: '0.75rem 1.5rem',
          fontSize: '0.875rem',
        },

        '.doc-link': {
          color: '#7d8590',
          textDecoration: 'none',
          transition: 'color 150ms',
          '&:hover': { color: '#e6edf3' },
        },

        '.doc-ext': {
          color: '#58a6ff',
          '&:hover': { textDecoration: 'underline' },
        },

        '.doc-h1': {
          fontSize: '1.5rem',
          fontWeight: '700',
          fontFamily: 'ui-monospace, monospace',
          marginBottom: '0.5rem',
        },

        '.doc-lead': {
          color: '#7d8590',
          marginBottom: '2.5rem',
          fontSize: '15px',
        },

        '.doc-h2': {
          fontSize: '11px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#7d8590',
          marginBottom: '0.75rem',
        },

        '.doc-p': {
          fontSize: '15px',
        },

        '.doc-sub': {
          fontSize: '13px',
          color: '#7d8590',
        },

        '.doc-hint': {
          fontSize: '12px',
          color: '#7d8590',
          marginTop: '0.5rem',
        },

        '.doc-pre': {
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '0.375rem',
          padding: '1rem 1.25rem',
          fontSize: '0.875rem',
          fontFamily: 'ui-monospace, monospace',
          overflowX: 'auto',
          lineHeight: '1.625',
          color: '#e6edf3',
        },

        '.doc-copy': {
          position: 'absolute',
          top: '0.625rem',
          right: '0.625rem',
          fontSize: '11px',
          color: '#7d8590',
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '0.25rem',
          padding: '0.125rem 0.5rem',
          opacity: '0',
          transition: 'opacity 150ms, color 150ms',
          cursor: 'pointer',
          '&:hover': { color: '#e6edf3' },
        },
        '.group:hover .doc-copy': {
          opacity: '1',
        },

        '.doc-code': {
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          color: '#ff7b72',
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '3px',
          padding: '0.15em 0.4em',
        },

        '.doc-tag': {
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          color: '#ff7b72',
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '3px',
          padding: '0.15em 0.4em',
          flexShrink: '0',
        },

        '.doc-name': {
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.875rem',
          color: '#ff7b72',
        },

        '.doc-table': {
          border: '1px solid #30363d',
          borderRadius: '0.375rem',
          fontSize: '14px',
          overflow: 'hidden',
          '& > * + *': { borderTop: '1px solid #30363d' },
        },

        '.doc-row': {
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          padding: '0.75rem 1rem',
        },

        '.doc-note': {
          backgroundColor: 'rgba(56, 139, 253, 0.1)',
          border: '1px solid rgba(56, 139, 253, 0.4)',
          borderRadius: '0.375rem',
          padding: '0.75rem 1rem',
          fontSize: '14px',
          color: '#58a6ff',
        },
        '.doc-note code': {
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          fontWeight: '600',
        },
        '.doc-note a': {
          textDecoration: 'underline',
        },

        '.doc-demo': {
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '0.375rem',
        },

        '.doc-item': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          transition: 'background-color 150ms',
          '&:hover': { backgroundColor: '#161b22' },
          '&:hover span': { color: '#e6edf3' },
        },
        '.doc-item span': {
          transition: 'color 150ms',
          color: '#7d8590',
          fontSize: '0.875rem',
        },

      })
    }
  ]
}
