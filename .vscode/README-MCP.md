# MCP Configuration for WhatsFest

Este projeto está configurado para usar o Model Context Protocol (MCP) com GitHub Copilot, fornecendo ferramentas avançadas para desenvolvimento.

## 🚀 Servidores MCP Configurados

### 1. **Fetch Server**
- **Função**: Buscar conteúdo web para pesquisa e documentação
- **Uso**: Pesquisar APIs, documentação, exemplos de código
- **Comando**: `uvx mcp-server-fetch`

### 2. **Filesystem Server**  
- **Função**: Acesso aos arquivos e diretórios do projeto
- **Uso**: Navegar, ler e analisar arquivos do projeto
- **Comando**: `uvx mcp-server-filesystem --base-path .`

### 3. **Git Server**
- **Função**: Operações Git e gerenciamento do repositório
- **Uso**: Histórico, commits, branches, diffs
- **Comando**: `uvx mcp-server-git --repository .`

## 📋 Como Usar

### 1. **Pré-requisitos**
- VS Code versão 1.99+
- GitHub Copilot ativo
- Python com `uvx` instalado

### 2. **Ativação**
1. Abra o arquivo `.vscode/mcp.json`
2. Clique no botão **"Iniciar"** que aparece no topo
3. Confirme a inicialização dos servidores

### 3. **Uso no Copilot Chat**
1. Abra o Copilot Chat (Ctrl+Shift+P → "GitHub Copilot: Open Chat")
2. Selecione **"Agente"** no menu
3. Clique no ícone de ferramentas para ver servidores MCP disponíveis
4. Use comandos como:
   - `Fetch the documentation for React hooks`
   - `Analyze the structure of this project`
   - `Show me the git history for the admin page`

## 🛠 Exemplos de Comandos

### **Pesquisa Web**
```
Fetch https://docs.render.com/deploy-node-express-app
```

### **Análise de Código**
```
Analyze the API structure in the backend folder
```

### **Git Operations**
```
Show me the recent commits related to admin functionality
```

## 🔧 Troubleshooting

### **Servidores não iniciam**
```bash
# Instalar uvx se necessário
pip install uvx

# Verificar se os servidores MCP estão disponíveis
uvx mcp-server-fetch --help
```

### **Ferramentas não aparecem**
1. Verifique se o arquivo `.vscode/mcp.json` está correto
2. Reinicie o VS Code
3. Clique em "Iniciar" novamente

### **Permissões negadas**
- Confirme todas as solicitações de permissão do MCP
- Verifique se o Copilot tem acesso aos servidores MCP

## 📖 Recursos Úteis

- [Documentação oficial MCP](https://modelcontextprotocol.io/)
- [Repositório de servidores MCP](https://github.com/modelcontextprotocol/servers)
- [VS Code MCP Guide](https://code.visualstudio.com/docs/copilot/copilot-mcp)

---

**Configuração criada para WhatsFest - Plataforma de Eventos** 🎉