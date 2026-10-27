// Envia acessos e comentários para a Planilha Google (ver scripts/google-sheets/README.md)
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL
const VISIT_KEY = 'adf-visit-registered'
const COUNT_KEY = 'adf-visit-count'

// text/plain evita o preflight de CORS, que o Apps Script não responde
function post(body) {
  return fetch(SHEETS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  }).then((res) => res.json())
}

function alreadyRegistered() {
  try {
    return sessionStorage.getItem(VISIT_KEY) === '1'
  } catch {
    return false
  }
}

function markRegistered() {
  try {
    sessionStorage.setItem(VISIT_KEY, '1')
  } catch {
    // sem sessionStorage: conta de novo na próxima vez, sem problema
  }
}

// Último total recebido, para mostrar na hora enquanto a planilha responde (leva uns segundos)
export function getCachedVisits() {
  try {
    const value = Number(localStorage.getItem(COUNT_KEY))
    return value > 0 ? value : null
  } catch {
    return null
  }
}

function cacheVisits(visits) {
  try {
    localStorage.setItem(COUNT_KEY, String(visits))
  } catch {
    // sem localStorage: só não mostra o número antes da resposta
  }
}

// Conta um acesso por sessão do navegador e devolve o total
export async function registerVisit() {
  if (!SHEETS_URL) return null
  try {
    let data
    if (alreadyRegistered()) {
      data = await fetch(SHEETS_URL).then((res) => res.json())
    } else {
      data = await post({ type: 'visit', device: navigator.userAgent })
      markRegistered()
    }
    cacheVisits(data.visits)
    return data.visits
  } catch (error) {
    console.warn('Não foi possível registrar o acesso', error)
    return null
  }
}

export function sendFeedback(feedback) {
  if (!SHEETS_URL) return Promise.resolve()
  return post({ type: 'feedback', ...feedback }).catch((error) => {
    console.warn('Não foi possível enviar o comentário', error)
  })
}
