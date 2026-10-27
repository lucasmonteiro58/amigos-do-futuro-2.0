/**
 * Backend do Amigos do Futuro em uma Planilha Google.
 * Cole este arquivo em Extensões > Apps Script da planilha e publique como "App da Web".
 * Passo a passo em scripts/google-sheets/README.md
 */

const SHEET_VISITS = 'Acessos'
const SHEET_FEEDBACK = 'Comentarios'

const HEADERS = {
  [SHEET_VISITS]: ['Data', 'Dispositivo'],
  [SHEET_FEEDBACK]: [
    'Data',
    'Nome',
    'Idade',
    'Gênero',
    'Cidade',
    'Região',
    'Gostou?',
    'Mensagem',
    'Selo do quiz',
    'Desafios concluídos'
  ]
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.appendRow(HEADERS[name])
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, HEADERS[name].length).setFontWeight('bold')
  }
  return sheet
}

function countVisits() {
  return Math.max(getSheet(SHEET_VISITS).getLastRow() - 1, 0)
}

// Impede que textos começando com = + - @ virem fórmulas na planilha
function clean(value, max) {
  const text = String(value == null ? '' : value).slice(0, max || 200)
  return /^[=+\-@]/.test(text) ? "'" + text : text
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function doGet() {
  return json({ ok: true, visits: countVisits() })
}

function doPost(e) {
  const body = JSON.parse((e.postData && e.postData.contents) || '{}')
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)

  try {
    if (body.type === 'visit') {
      getSheet(SHEET_VISITS).appendRow([new Date(), clean(body.device, 300)])
      return json({ ok: true, visits: countVisits() })
    }

    if (body.type === 'feedback') {
      getSheet(SHEET_FEEDBACK).appendRow([
        new Date(),
        clean(body.name),
        clean(body.age),
        clean(body.gender),
        clean(body.city),
        clean(body.region),
        clean(body.liked),
        clean(body.message, 5000),
        clean(body.badge),
        clean(body.completed)
      ])
      return json({ ok: true })
    }

    return json({ ok: false, error: 'tipo desconhecido' })
  } finally {
    lock.releaseLock()
  }
}
