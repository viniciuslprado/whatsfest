const Sobre: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto my-8 border border-gray-100">
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-6">💡 A Essência do WhatsFest: Por Que Nascemos?</h2>
    <p className="text-gray-700 text-lg mb-4 text-center">
      O WhatsFest nasceu de uma necessidade real: <b>simplificar a vida social</b>.<br/>
      Percebemos que as melhores festas, shows e eventos culturais estavam perdidos em grupos de WhatsApp, stories que expiravam e sites desorganizados.<br/>
      A cidade tinha vida, mas era difícil achá-la!
    </p>
    <p className="text-gray-700 text-lg mb-4 text-center">
      Nosso propósito é ser o ponto de encontro digital que resolve esse problema.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
      <a href="https://www.instagram.com/whatsfest/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition">
        <svg width="20" height="20" fill="currentColor" className=""><path d="M7.5 2A5.5 5.5 0 0 0 2 7.5v5A5.5 5.5 0 0 0 7.5 18h5a5.5 5.5 0 0 0 5.5-5.5v-5A5.5 5.5 0 0 0 12.5 2h-5zm0 1.5h5A4 4 0 0 1 16.5 7.5v5a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4v-5A4 4 0 0 1 7.5 3.5zm7.25 2.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM10 6.5A3.5 3.5 0 1 0 10 13.5a3.5 3.5 0 0 0 0-7zm0 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>
        Instagram
      </a>
      <a href="https://chat.whatsapp.com/DVbSwHcYZqJ3lFapfelkN6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:scale-105 transition">
        <svg width="20" height="20" fill="currentColor" className=""><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        Grupo WhatsApp
      </a>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-bold text-purple-700 mb-2">No WhatsApp e Instagram:</h3>
      <p className="text-gray-700 mb-2">Garantimos a conexão rápida e as últimas novidades.</p>
      <h3 className="text-xl font-bold text-purple-700 mb-2">No Site/Plataforma:</h3>
      <p className="text-gray-700 mb-2">Oferecemos a organização, segurança e o mapa completo que nenhuma rede social pode dar.</p>
      <p className="text-gray-700 mb-2">Surgimos para que você nunca mais diga: <b>"Eu queria ter sabido disso antes!"</b></p>
    </div>
    <h3 className="text-2xl font-bold text-pink-600 mb-4">🤝 Nossos Valores no Dia a Dia</h3>
    <ol className="list-decimal pl-6 text-gray-700 space-y-3 mb-2">
      <li>
        <b>Comunicação Sem Ruído</b><br/>
        <span className="text-sm">Valorizamos a clareza e a agilidade. Queremos que a informação do evento (local, data, ingressos) seja instantânea e confiável, seja na notificação do WhatsApp ou na busca avançada do site.</span>
      </li>
      <li>
        <b>Visibilidade Cultural</b><br/>
        <span className="text-sm">Somos a vitrine do talento local. Usamos a facilidade do Instagram para mostrar a energia do evento e o poder de organização da plataforma para garantir que toda forma de arte e cultura encontre seu público.</span>
      </li>
      <li>
        <b>Tecnologia a Serviço da Descoberta</b><br/>
        <span className="text-sm">Nossa tecnologia deve ser quase invisível. Ela está ali para simplificar. É a organização do site que tira o peso das costas dos organizadores e a facilidade de uso que faz o público voltar sempre.</span>
      </li>
      <li>
        <b>Comunidade Genuína</b><br/>
        <span className="text-sm">Construímos mais que uma lista de eventos, construímos uma comunidade. As interações no WhatsApp e no Instagram são vitais para nos manter conectados e ouvirmos o que a cidade realmente quer.</span>
      </li>
    </ol>
  </div>
);

export default Sobre;
