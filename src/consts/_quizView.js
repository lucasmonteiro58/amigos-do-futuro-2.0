export const badgesTexts = [
  {
    id: 'sau',
    color: '#D31A1A',
    img: 'quiz_sau-badge',
    audio: 'quiz_sau',
    levels: 2,
    title: 'Amigo da Saúde',
    duration: 8000,
    description:
      'Adora cuidar de outras pessoas, tem muita coragem para salvar vidas e é muito amável.'
  },
  {
    id: 'laz',
    color: '#D87100',
    img: 'quiz_laz-badge',
    audio: 'quiz_laz',
    duration: 5001,
    levels: 3,
    title: 'Amigo do Lazer',
    description: 'É muito divertido e adora conhecer lugares novos.'
  },
  {
    id: 'eco',
    color: '#E0C43B',
    img: 'quiz_eco-badge',
    audio: 'quiz_eco',
    duration: 5002,
    levels: 2,
    title: 'Amigo da Economia',
    description: 'Ama números e sabe bem como vender algo para juntar dinheiro.'
  },
  {
    id: 'mei',
    color: '#48A32E',
    img: 'quiz_mei-badge',
    audio: 'quiz_mei',
    duration: 4003,
    levels: 3,
    title: 'Amigo da Sustentabilidade',
    description: 'Respeita a natureza e está sempre ajudando outras pessoas.'
  },
  {
    id: 'gov',
    color: '#007500',
    img: 'quiz_gov-badge',
    audio: 'quiz_gov',
    duration: 7002,
    levels: 4,
    title: 'Amigo do Governo',
    description: 'Gosta muito de falar com as pessoas. É responsável e organizado.'
  },
  {
    id: 'edu',
    color: '#046799',
    img: 'quiz_edu-badge',
    audio: 'quiz_edu',
    duration: 9001,
    levels: 3,
    title: 'Amigo da Educação',
    description:
      'É muito curioso e está sempre lendo livros, revistas e histórias em quadrinho. Também adora ensinar os amigos.'
  },
  {
    id: 'ino',
    color: '#8748AF',
    img: 'quiz_ino-badge',
    audio: 'quiz_ino',
    duration: 7008,
    levels: 3,
    title: 'Amigo da Inovação',
    description:
      'Criatividade é o seu ponto forte. Observa tudo à sua volta e não desiste fácil das coisas.'
  }
]

export const quizQuestions = [
  {
    title: 'Você ficaria um mês numa floresta com seus amigos?',
    duration: 5000,
    name: 'mei',
    audio: 'quiz_pergunta1',
    matriz: {
      mei: 3,
      laz: 2,
      ino: -1,
      edu: -2,
      eco: -3,
      sau: 1,
      gov: 0
    }
  },
  {
    title: 'Aceitar sair amanhã de manhã para uma viagem por todo o Ceará?',
    duration: 5001,
    name: 'laz',
    audio: 'quiz_pergunta2',
    matriz: {
      mei: 1,
      laz: 3,
      ino: -2,
      edu: -1,
      eco: 2,
      sau: 0,
      gov: -3
    }
  },
  {
    title: 'Aceitaria trocar seus olhos por outros com visão de raio x',
    duration: 7000,
    name: 'ino',
    audio: 'quiz_pergunta3',
    matriz: {
      mei: -3,
      laz: 1,
      ino: 3,
      edu: 2,
      eco: 0,
      sau: -1,
      gov: -2
    }
  },
  {
    title: 'Aceitaria ser professor/professora da sua turma?',
    duration: 4500,
    name: 'edu',
    audio: 'quiz_pergunta4',
    matriz: {
      mei: -2,
      laz: 0,
      ino: 1,
      edu: 3,
      eco: -1,
      sau: -3,
      gov: 2
    }
  },
  {
    title: 'Trocaria seus brinquedos por dinheiro?',
    duration: 3000,
    name: 'eco',
    audio: 'quiz_pergunta5',
    matriz: {
      mei: -1,
      laz: -3,
      ino: 2,
      edu: 0,
      eco: 3,
      sau: -2,
      gov: 1
    }
  },
  {
    title: 'Gostaria de colher sua comida no quintal da sua casa?',
    duration: 4501,
    name: 'sau',
    audio: 'quiz_pergunta6',
    matriz: {
      mei: 2,
      laz: -2,
      ino: 0,
      edu: -3,
      eco: 1,
      sau: 3,
      gov: -1
    }
  },
  {
    title: 'Você gostaria de ser o prefeito da sua cidade?',
    duration: 4502,
    name: 'gov',
    audio: 'quiz_pergunta7',
    matriz: {
      mei: 0,
      laz: -1,
      ino: -3,
      edu: 1,
      eco: -2,
      sau: 2,
      gov: 3
    }
  }
]
