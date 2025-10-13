import { FaEnvelope } from 'react-icons/fa';

const Sobre: React.FC = () => (
  <section className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-6 text-purple-800">Sobre o WhatsFest</h1>
    <p className="mb-4 text-lg text-gray-700">
      O WhatsFest é uma plataforma independente para divulgação de festas, eventos e rolês pelo Brasil. Nosso objetivo é conectar pessoas a experiências inesquecíveis, facilitando o acesso à programação cultural e de entretenimento da sua cidade.
    </p>
    <p className="mb-4 text-lg text-gray-700">
      O site é colaborativo e aberto para produtores, organizadores e público em geral sugerirem eventos. Não vendemos ingressos, apenas divulgamos!
    </p>
    <p className="mb-4 text-lg text-gray-700">
      Para dúvidas, sugestões ou parcerias, entre em contato:
    </p>
    {/* Botão do grupo WhatsApp */}
    <a
      href="https://chat.whatsapp.com/DVbSwHcYZqJ3lFapfelkN6"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow transition mb-4"
    >
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2.003c-5.523 0-9.997 4.474-9.997 9.997 0 1.762.463 3.484 1.342 4.995l-1.409 5.151a1.001 1.001 0 0 0 1.225 1.225l5.151-1.409a9.953 9.953 0 0 0 4.995 1.342c5.523 0 9.997-4.474 9.997-9.997s-4.474-9.997-9.997-9.997zm0 17.994a7.96 7.96 0 0 1-4.073-1.142l-.291-.172-3.055.836.836-3.055-.172-.291a7.96 7.96 0 0 1-1.142-4.073c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.425-5.842c-.242-.121-1.434-.707-1.655-.788-.221-.081-.382-.121-.543.121-.161.242-.623.788-.764.949-.141.161-.282.181-.523.06-.242-.121-1.022-.377-1.947-1.202-.72-.642-1.207-1.435-1.35-1.677-.141-.242-.015-.373.106-.494.109-.108.242-.282.363-.423.121-.141.161-.242.242-.403.081-.161.04-.302-.02-.423-.06-.121-.543-1.312-.744-1.797-.196-.471-.396-.406-.543-.414l-.463-.008c-.161 0-.423.06-.646.282-.221.221-.843.824-.843 2.008 0 1.184.863 2.327.983 2.489.121.161 1.698 2.595 4.118 3.535.576.198 1.025.316 1.376.405.577.147 1.102.127 1.517.077.463-.055 1.434-.586 1.637-1.152.202-.566.202-1.051.141-1.152-.06-.101-.221-.161-.463-.282z"/></svg>
      Grupo WhatsApp
    </a>
    {/* Botão de email */}
    <a
      href="mailto:whatsfests@gmail.com"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow transition mb-4 ml-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaEnvelope /> whatsfests@gmail.com
    </a>
  </section>
);

export default Sobre;
