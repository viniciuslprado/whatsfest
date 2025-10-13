const Contato: React.FC = () => (
  <div style={{ 
    background: 'white', 
    borderRadius: '16px', 
    padding: '32px', 
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  }}>
    <h2 style={{ 
      fontSize: '32px', 
      color: '#1f2937', 
      marginBottom: '24px',
      textAlign: 'center'
    }}>
      📞 Entre em Contato
    </h2>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ 
        display: 'grid', 
        gap: '24px', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        marginBottom: '32px'
      }}>
        <div style={{ 
          background: '#f8fafc', 
          padding: '24px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '12px' }}>📧 Email</h3>
          <p style={{ color: '#374151' }}>contato@whatsfest.com</p>
        </div>
        
        <div style={{ 
          background: '#f8fafc', 
          padding: '24px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '12px' }}>📱 WhatsApp</h3>
          <p style={{ color: '#374151' }}>(11) 99999-9999</p>
        </div>
      </div>
      
      <form style={{ 
        background: '#f8fafc', 
        padding: '24px', 
        borderRadius: '12px'
      }}>
        <h3 style={{ color: '#374151', marginBottom: '16px' }}>💬 Envie uma mensagem</h3>
        
        <input 
          type="text"
          placeholder="Seu nome"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
        
        <input 
          type="email"
          placeholder="Seu email"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
        
        <textarea 
          placeholder="Sua mensagem"
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            resize: 'vertical'
          }}
        />
        
        <button
          type="submit"
          style={{
            background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  </div>
);

export default Contato;
