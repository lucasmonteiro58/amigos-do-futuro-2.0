# Acessos e comentários na Planilha Google

O jogo grava os acessos (aba **Acessos**) e os comentários do final (aba **Comentarios**)
numa Planilha Google. As abas são criadas sozinhas no primeiro envio.

## Configurar (uma vez, ~5 minutos)

1. Crie uma planilha nova em https://sheets.new
2. Na planilha: **Extensões > Apps Script**
3. Apague o conteúdo do editor, cole o conteúdo de [`Code.gs`](./Code.gs) e salve (Ctrl/Cmd + S)
4. **Implantar > Nova implantação**
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   - Clique em **Implantar** e autorize com sua conta Google
     (se aparecer "O Google não verificou este app": **Avançado > Acessar ... (não seguro)** — é o seu próprio script)
5. Copie a **URL do app da Web** (termina em `/exec`) e coloque no arquivo `.env` na raiz do projeto:

   ```
   VITE_SHEETS_URL=https://script.google.com/macros/s/XXXX/exec
   ```

6. Se o site é publicado por Netlify/Vercel/Cloudflare, adicione a mesma variável
   `VITE_SHEETS_URL` nas configurações de ambiente do painel e faça um novo deploy.

## Ver os dados

Abra a planilha. Cada linha da aba **Acessos** é um acesso (contado uma vez por sessão do
navegador); o total aparece no contador da tela inicial. A aba **Comentarios** tem nome,
idade, gênero, cidade, região, se gostou, a mensagem, o selo do quiz e os desafios concluídos.

## Mudou o `Code.gs`?

Em **Implantar > Gerenciar implantações**, edite a implantação e escolha **Nova versão**.
Assim a URL continua a mesma.
