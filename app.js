// Кира Sale — подбор помощи (как Telegram-Кира). Лендинг → онбординг → чат.
// Один режим school, мультиязычность, без подписки.
(function () {
  "use strict";

  const BACKEND = (window.KIRA_CONFIG && window.KIRA_CONFIG.BACKEND_URL) || "";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // ─── Переводы ───
  const TRANSLATIONS = {
    ru: {
      "meta.title": "Кира — подбор помощи | Школа доктора Шурова",
      "meta.description": "Кира подберёт формат помощи в школе и клинике доктора Шурова: консультации, программы, VIP. Анонимно, 24/7, на 5 языках.",
      "nav.doctor": "Доктор", "nav.benefits": "Возможности", "nav.pricing": "Тарифы", "nav.start": "Подобрать помощь",
      "hero.eyebrow": "Подбор помощи · школа доктора Шурова", "hero.title": "Здравствуйте,<br>я&nbsp;Кира",
      "hero.sub": "Подберу подходящий формат помощи — консультацию, программу или VIP — по вашей ситуации. Анонимно, без осуждения, на связи 24/7. Как в Telegram-боте, но на сайте и на разных языках.",
      "hero.cta.start": "Подобрать помощь", "hero.cta.pricing": "С чего начать",
      "ways.eyebrow": "С чего начать",
      "ways.self.title": "Я зависим", "ways.self.desc": "Разберёмся, что происходит, и наметим первый шаг.",
      "ways.relative.title": "Мой близкий употребляет", "ways.relative.desc": "Поддержка для родственников и созависимых.",
      "ways.psychiatry.title": "Тревога, депрессия, состояние", "ways.psychiatry.desc": "Психиатрия: помогу понять и подобрать формат помощи.",
      "doctor.name": "Василий Александрович Шуров", "doctor.role": "Врач психиатр-нарколог · более 20 лет практики",
      "doctor.facts.1": "Основатель клиники «Первый шаг», реабилитационных центров и Онлайн-школы",
      "doctor.facts.2": "Помог более чем 10 000 семьям", "doctor.facts.3": "Создатель специальных БАДов Bioiboro",
      "doctor.facts.4": "Основатель благотворительного фонда «Выбери жизнь»",
      "doctor.facts.5": "Спикер форумов, эксперт в СМИ", "doctor.facts.6": "Ведущий проекта «Звёзды под капельницей»",
      "doctor.video.eyebrow": "Видеообращение", "doctor.video.cap": "Личное видеообращение доктора Шурова",
      "benefits.title": "Что вы получаете",
      "benefits.1": "Подбор формата под вашу ситуацию", "benefits.2": "Точные цены и ссылки на программы",
      "benefits.3": "Для себя или близкого — без стыда", "benefits.4": "Зависимость, созависимость, тревога",
      "benefits.5": "Переход к куратору и клиникам Шурова", "benefits.6": "Работает на 5 языках",
      "benefits.7": "Анонимно, 24/7", "benefits.8": "Тот же подход, что у Telegram-Киры",
      "benefits.quote": "Иногда самый сложный шаг — не лечение, а первый честный разговор. Кира поможет понять, какой формат подходит именно вам.",
      "benefits.cta": "Подобрать помощь",
      "legal.text": "Кира не является заменой врача, не ставит диагнозы и не оказывает медицинскую услугу. Информация носит справочный и поддерживающий характер. При угрозе жизни, передозировке, психозе, суицидальных мыслях или резком ухудшении состояния необходимо срочно обратиться за медицинской помощью по телефонам <b>112</b> или <b>103</b>.",
      "footer.privacy": "Политика конфиденциальности", "footer.terms": "Пользовательское соглашение",
      "footer.consent": "Согласие на обработку персональных данных", "footer.refund": "Правила оплаты и возврата",
      "footer.legal": "Юридическая информация", "footer.contacts": "Контакты", "footer.disclaimer": "Медицинский дисклеймер",
      "footer.sos": "Экстренная помощь: <b>112</b> или <b>103</b>", "footer.copy": "© Онлайн-школа доктора Шурова",
      "tabbar.home": "Главная", "tabbar.doctor": "Доктор", "tabbar.pricing": "Возможности", "tabbar.chat": "Подбор",
      "chat.newChat": "Новый разговор", "chat.quickStart": "Быстрый старт",
      "chat.quick.self": "Мне сложно с зависимостью", "chat.quick.relative": "Переживаю за близкого",
      "chat.quick.psychiatry": "Тревога, депрессия, сон", "chat.quick.pricing": "С чего начать",
      "chat.online": "Кира на связи", "chat.toSite": "На сайт →",
      "chat.mode.expert": "Разговор", "chat.mode.school": "Подбор помощи",
      "chat.placeholder": "Напишите Кире…", "chat.note": "Кира — ИИ и не заменяет врача. При угрозе жизни — 103 или 112.",
      "sub.badge": "Пробный день бесплатно", "sub.title": "Полный доступ к Кире", "sub.period": "/ месяц",
      "sub.features.1": "Безлимитный анонимный разговор 24/7",
      "sub.features.2": "Экспертный разбор как у психолога-аддиктолога",
      "sub.features.3": "Поддержка при зависимости, созависимости, тревоге",
      "sub.features.4": "Подбор формата помощи и переход к клиникам Шурова",
      "sub.cta": "Начать пробный день",
      "sub.legal": "Нажимая, вы соглашаетесь с условиями и медицинским дисклеймером. Кира не заменяет врача и не ставит диагнозы. Экстренная помощь — 112 / 103.",
      "ob.who.q": "Кому нужна помощь?", "ob.who.hint": "Это останется между нами — анонимно и конфиденциально.",
      "ob.who.self": "Мне", "ob.who.relative": "Близкому человеку", "ob.who.psychiatry": "Тревога, депрессия, сон",
      "ob.concern.q": "Что беспокоит больше всего?", "ob.concern.hint": "Можно уточнить в разговоре — это лишь начало.",
      "ob.name.q": "Как к вам обращаться?", "ob.name.hint": "По желанию — можно оставить пустым.", "ob.name.ph": "Имя",
      "ob.name.go": "Начать разговор", "ob.skip": "Пропустить",
      "concern.alcohol": "Алкоголь", "concern.drugs": "Наркотики", "concern.both": "И то, и другое",
      "concern.behavior": "Игры / поведение", "concern.unknown": "Пока не знаю",
      "concern.anxiety": "Тревога", "concern.depression": "Депрессия",
      "concern.sleep": "Проблемы со сном", "concern.panic": "Панические атаки", "concern.other": "Другое",
      "chip.psychiatry.1": "Постоянная тревога и плохой сон", "chip.psychiatry.2": "Кажется, у меня депрессия", "chip.psychiatry.3": "Панические атаки — что делать?",
      "chip.relative.1": "Близкий человек употребляет", "chip.relative.2": "Как поговорить, не оттолкнув?", "chip.relative.3": "Что делать родственникам?",
      "chip.self.1": "Сложно контролировать употребление", "chip.self.2": "Как понять, что это зависимость?", "chip.self.3": "Постоянная тяга и срывы",
      "greet.prefix": "Здравствуйте", "greet.name_prefix": "Здравствуйте,", "greet.intro": "Я Кира, ИИ-помощница школы доктора Шурова — помогу подобрать формат помощи.",
      "greet.psychiatry.concern": "Понимаю — беспокоит {c}. Это тяжело нести в одиночку, и хорошо, что вы решили поговорить. Расскажите, что происходит и как давно, — я помогу разобраться.",
      "greet.psychiatry.default": "Хорошо, что вы решили поговорить о своём состоянии. Расскажите, что беспокоит сильнее всего, — я помогу разобраться.",
      "greet.addiction.concern": "Вижу, что помощь нужна для {w}, и что беспокоит {c}. Говорить об этом непросто — здесь можно честно, без осуждения. Расскажите, что происходит сейчас.",
      "greet.addiction.default": "Говорить об этом непросто — здесь можно честно, без осуждения. Расскажите, что происходит с {w} сейчас, — и я помогу разобраться.",
      "greet.for.self": "вас", "greet.for.relative": "близкого человека",
      "concern.label.alcohol": "тема алкоголя", "concern.label.drugs": "употребление веществ", "concern.label.both": "употребление",
      "concern.label.behavior": "зависимое поведение", "concern.label.anxiety": "тревога",
      "concern.label.depression": "подавленное состояние", "concern.label.sleep": "сон",
      "concern.label.panic": "панические атаки", "concern.label.other": "ваше состояние",
      "lead.open": "Оставить номер", "lead.title": "Оставить номер",
      "lead.hint": "Менеджер позвонит в удобное время. Ссылок на оплату нет — сначала разберём ситуацию.",
      "lead.name": "Имя", "lead.phone": "Телефон", "lead.time": "Когда удобно позвонить",
      "lead.time.ph": "Например: сегодня после 18:00",
      "lead.consent": "Согласен(на), что менеджер может позвонить по этому номеру",
      "lead.submit": "Отправить", "lead.ok": "Спасибо! Менеджер свяжется в указанное время.",
      "lead.err": "Не удалось отправить. Проверьте номер и согласие.",
      "lead.err.phone": "Укажите номер телефона", "lead.err.consent": "Нужно согласие на звонок",
      "chat.you": "Вы",
    },
    en: {
      "meta.title": "Kira — AI assistant of Dr. Shurov",
      "meta.description": "Kira is an anonymous AI psychologist-addictologist trained by Dr. Vasily Shurov. Available 24/7 to help with addiction, anxiety and depression.",
      "nav.doctor": "Doctor", "nav.benefits": "Features", "nav.pricing": "Features", "nav.start": "Find help",
      "hero.eyebrow": "Help matching · Dr. Shurov's school", "hero.title": "Hello,<br>I'm&nbsp;Kira",
      "hero.sub": "I'll help you choose a suitable format of care — consultation, program or clinic support. Anonymous, without judgment, 24/7. Same approach as the Telegram bot, on the web and in multiple languages.",
      "hero.cta.start": "Find help", "hero.cta.pricing": "Where to begin",
      "ways.eyebrow": "Where to begin",
      "ways.self.title": "I have an addiction", "ways.self.desc": "We'll understand what's happening and plan the first step.",
      "ways.relative.title": "My loved one is using", "ways.relative.desc": "Support for family members and co-dependents.",
      "ways.psychiatry.title": "Anxiety, depression, mood", "ways.psychiatry.desc": "Psychiatry: I'll help understand and find the right help.",
      "doctor.name": "Vasily Alexandrovich Shurov", "doctor.role": "Psychiatrist-narcologist · 20+ years of practice",
      "doctor.facts.1": "Founder of the First Step clinic, rehabilitation centers and Online School",
      "doctor.facts.2": "Helped more than 10,000 families", "doctor.facts.3": "Creator of Bioiboro supplements",
      "doctor.facts.4": "Founder of the Choose Life charitable foundation",
      "doctor.facts.5": "Forum speaker, media expert", "doctor.facts.6": "Host of Stars Under a Drip",
      "doctor.video.eyebrow": "Video message", "doctor.video.cap": "Personal video message from Dr. Shurov",
      "benefits.title": "What you get",
      "benefits.1": "Anonymous conversation 24/7", "benefits.2": "Start without a call, without shame or fear",
      "benefits.3": "Careful analysis of your situation", "benefits.4": "Help with addiction and co-dependency",
      "benefits.5": "Support for family members", "benefits.6": "Answers about anxiety, depression and psychiatry",
      "benefits.7": "I'll suggest the right format of help", "benefits.8": "Referral to Dr. Shurov's clinics",
      "benefits.quote": "Sometimes the hardest step isn't treatment — it's the first honest conversation. Kira was created to make that conversation easier.",
      "benefits.cta": "Find help",
      "legal.text": "Kira is not a substitute for a doctor, does not diagnose and does not provide medical services. Information is advisory and supportive. In case of life-threatening situations — call <b>112</b> or <b>103</b>.",
      "footer.privacy": "Privacy Policy", "footer.terms": "Terms of Service",
      "footer.consent": "Data processing consent", "footer.refund": "Payment & Refund Policy",
      "footer.legal": "Legal information", "footer.contacts": "Contacts", "footer.disclaimer": "Medical disclaimer",
      "footer.sos": "Emergency: <b>112</b> or <b>103</b>", "footer.copy": "© Dr. Shurov Online School",
      "tabbar.home": "Home", "tabbar.doctor": "Doctor", "tabbar.pricing": "Features", "tabbar.chat": "Chat",
      "chat.newChat": "New conversation", "chat.quickStart": "Quick start",
      "chat.quick.self": "I struggle with addiction", "chat.quick.relative": "Worried about a loved one",
      "chat.quick.psychiatry": "Anxiety, depression, sleep", "chat.quick.pricing": "Where to begin",
      "chat.online": "Kira is online", "chat.toSite": "Back to site →",
      "chat.mode.expert": "Conversation", "chat.mode.school": "Find help",
      "chat.placeholder": "Write to Kira…", "chat.note": "Kira is AI and doesn't replace a doctor. Emergency — 103 or 112.",
      "sub.badge": "First day free", "sub.title": "Full access to Kira", "sub.period": "/ month",
      "sub.features.1": "Unlimited anonymous conversation 24/7",
      "sub.features.2": "Expert analysis like a psychologist-addictologist",
      "sub.features.3": "Support for addiction, co-dependency, anxiety",
      "sub.features.4": "Help format selection and referral to Dr. Shurov's clinics",
      "sub.cta": "Start free trial day",
      "sub.legal": "By clicking, you agree to the terms and medical disclaimer. Kira does not replace a doctor and does not diagnose. Emergency — 112 / 103.",
      "ob.who.q": "Who needs help?", "ob.who.hint": "This stays between us — anonymous and confidential.",
      "ob.who.self": "Me", "ob.who.relative": "A loved one", "ob.who.psychiatry": "Anxiety, depression, sleep",
      "ob.concern.q": "What's bothering you most?", "ob.concern.hint": "You can clarify in the conversation — this is just the beginning.",
      "ob.name.q": "What should I call you?", "ob.name.hint": "Optional — you can leave it empty.", "ob.name.ph": "Name",
      "ob.name.go": "Start conversation", "ob.skip": "Skip",
      "concern.alcohol": "Alcohol", "concern.drugs": "Drugs", "concern.both": "Both",
      "concern.behavior": "Gaming / behaviour", "concern.unknown": "Not sure yet",
      "concern.anxiety": "Anxiety", "concern.depression": "Depression",
      "concern.sleep": "Sleep problems", "concern.panic": "Panic attacks", "concern.other": "Other",
      "chip.psychiatry.1": "Constant anxiety and poor sleep", "chip.psychiatry.2": "I think I have depression", "chip.psychiatry.3": "Panic attacks — what to do?",
      "chip.relative.1": "My loved one is using", "chip.relative.2": "How to talk without pushing away?", "chip.relative.3": "What should family members do?",
      "chip.self.1": "Hard to control my use", "chip.self.2": "How do I know if it's addiction?", "chip.self.3": "Constant cravings and relapses",
      "greet.prefix": "Hello", "greet.name_prefix": "Hello,", "greet.intro": "I'm Kira, AI psychologist-addictologist of Dr. Shurov's school.",
      "greet.psychiatry.concern": "I understand — you're concerned about {c}. That's hard to carry alone, and it's good you decided to talk. Tell me what's happening and how long it's been — I'll help you figure it out.",
      "greet.psychiatry.default": "I'm glad you decided to talk about how you're feeling. Tell me what's bothering you most — I'll help.",
      "greet.addiction.concern": "I see that {w} needs help, and {c} is a concern. It's not easy to talk about this — here you can be honest, without judgment. Tell me what's happening now.",
      "greet.addiction.default": "It's not easy to talk about this — here you can be honest, without judgment. Tell me what's happening with {w} now — and I'll help.",
      "greet.for.self": "you", "greet.for.relative": "your loved one",
      "concern.label.alcohol": "alcohol", "concern.label.drugs": "substance use", "concern.label.both": "substance use",
      "concern.label.behavior": "addictive behaviour", "concern.label.anxiety": "anxiety",
      "concern.label.depression": "depressed mood", "concern.label.sleep": "sleep",
      "concern.label.panic": "panic attacks", "concern.label.other": "your condition",
      "lead.open": "Leave number", "lead.title": "Leave your number",
      "lead.hint": "A manager will call at a convenient time. No payment links — first we clarify the situation.",
      "lead.name": "Name", "lead.phone": "Phone", "lead.time": "Best time to call",
      "lead.time.ph": "e.g. today after 6pm",
      "lead.consent": "I agree that a manager may call this number",
      "lead.submit": "Send", "lead.ok": "Thank you! A manager will call at the time you chose.",
      "lead.err": "Could not send. Check phone and consent.",
      "lead.err.phone": "Enter a phone number", "lead.err.consent": "Consent to call is required",
      "chat.you": "You",
    },
    uk: {
      "meta.title": "Кіра — ІІ-помічник доктора Шурова",
      "meta.description": "Кіра — анонімний ІІ-психолог-аддиктолог, навчений доктором Василем Шуровим. Допоможе з залежністю, тривогою та депресією. Анонімно, 24/7.",
      "nav.doctor": "Лікар", "nav.benefits": "Можливості", "nav.pricing": "Можливості", "nav.start": "Підібрати допомогу",
      "hero.eyebrow": "Підбір допомоги · школа доктора Шурова", "hero.title": "Добрий день,<br>я&nbsp;Кіра",
      "hero.sub": "Підберу формат допомоги — консультацію, програму чи підтримку клініки. Анонімно, без осуду, 24/7. Як у Telegram-боті, але на сайті й різними мовами.",
      "hero.cta.start": "Підібрати допомогу", "hero.cta.pricing": "З чого почати",
      "ways.eyebrow": "З чого почати",
      "ways.self.title": "Я залежний", "ways.self.desc": "Розберемося, що відбувається, і намітимо перший крок.",
      "ways.relative.title": "Мій близький вживає", "ways.relative.desc": "Підтримка для родичів і созалежних.",
      "ways.psychiatry.title": "Тривога, депресія, стан", "ways.psychiatry.desc": "Психіатрія: допоможу зрозуміти і підібрати формат допомоги.",
      "doctor.name": "Василь Олександрович Шуров", "doctor.role": "Лікар психіатр-нарколог · понад 20 років практики",
      "doctor.facts.1": "Засновник клініки «Перший крок», реабілітаційних центрів та Онлайн-школи",
      "doctor.facts.2": "Допоміг більше ніж 10 000 сімей", "doctor.facts.3": "Творець спеціальних БАДів Bioiboro",
      "doctor.facts.4": "Засновник благодійного фонду «Обери життя»",
      "doctor.facts.5": "Спікер форумів, експерт в ЗМІ", "doctor.facts.6": "Ведучий проєкту «Зірки під крапельницею»",
      "doctor.video.eyebrow": "Відеозвернення", "doctor.video.cap": "Особисте відеозвернення доктора Шурова",
      "benefits.title": "Що ви отримуєте",
      "benefits.1": "Анонімна розмова 24/7", "benefits.2": "Почати без дзвінка, без сорому та страху",
      "benefits.3": "Бережний розбір вашої ситуації", "benefits.4": "Допомога при залежності та созалежності",
      "benefits.5": "Підтримка для родичів", "benefits.6": "Відповіді про тривогу, депресію та психіатрію",
      "benefits.7": "Підкажу відповідний формат допомоги", "benefits.8": "Перехід до клінік Василя Шурова",
      "benefits.quote": "Іноді найскладніший крок — не лікування, а перша чесна розмова. Кіра створена для того, щоб ця розмова стала легшою.",
      "benefits.cta": "Підібрати допомогу",
      "legal.text": "Кіра не є заміною лікаря, не ставить діагнози і не надає медичну послугу. При загрозі життю — <b>112</b> або <b>103</b>.",
      "footer.privacy": "Політика конфіденційності", "footer.terms": "Угода користувача",
      "footer.consent": "Згода на обробку персональних даних", "footer.refund": "Правила оплати та повернення",
      "footer.legal": "Юридична інформація", "footer.contacts": "Контакти", "footer.disclaimer": "Медичний дисклеймер",
      "footer.sos": "Екстрена допомога: <b>112</b> або <b>103</b>", "footer.copy": "© Онлайн-школа доктора Шурова",
      "tabbar.home": "Головна", "tabbar.doctor": "Лікар", "tabbar.pricing": "Можливості", "tabbar.chat": "Чат",
      "chat.newChat": "Нова розмова", "chat.quickStart": "Швидкий старт",
      "chat.quick.self": "Мені важко із залежністю", "chat.quick.relative": "Переживаю за близького",
      "chat.quick.psychiatry": "Тривога, депресія, сон", "chat.quick.pricing": "З чого почати",
      "chat.online": "Кіра на зв'язку", "chat.toSite": "На сайт →",
      "chat.mode.expert": "Розмова", "chat.mode.school": "Підбір допомоги",
      "chat.placeholder": "Напишіть Кірі…", "chat.note": "Кіра — ІІ і не замінює лікаря. При загрозі — 103 або 112.",
      "sub.badge": "Пробний день безкоштовно", "sub.title": "Повний доступ до Кіри", "sub.period": "/ місяць",
      "sub.features.1": "Безлімітна анонімна розмова 24/7",
      "sub.features.2": "Експертний розбір як у психолога-аддиктолога",
      "sub.features.3": "Підтримка при залежності, созалежності, тривозі",
      "sub.features.4": "Підбір формату допомоги і перехід до клінік Шурова",
      "sub.cta": "Почати пробний день",
      "sub.legal": "Натискаючи, ви погоджуєтесь з умовами та медичним дисклеймером. Екстрена допомога — 112 / 103.",
      "ob.who.q": "Кому потрібна допомога?", "ob.who.hint": "Це залишиться між нами — анонімно і конфіденційно.",
      "ob.who.self": "Мені", "ob.who.relative": "Близькій людині", "ob.who.psychiatry": "Тривога, депресія, сон",
      "ob.concern.q": "Що турбує найбільше?", "ob.concern.hint": "Можна уточнити в розмові — це лише початок.",
      "ob.name.q": "Як до вас звертатися?", "ob.name.hint": "За бажанням — можна залишити порожнім.", "ob.name.ph": "Ім'я",
      "ob.name.go": "Почати розмову", "ob.skip": "Пропустити",
      "concern.alcohol": "Алкоголь", "concern.drugs": "Наркотики", "concern.both": "І те, й інше",
      "concern.behavior": "Ігри / поведінка", "concern.unknown": "Поки не знаю",
      "concern.anxiety": "Тривога", "concern.depression": "Депресія",
      "concern.sleep": "Проблеми зі сном", "concern.panic": "Панічні атаки", "concern.other": "Інше",
      "chip.psychiatry.1": "Постійна тривога і поганий сон", "chip.psychiatry.2": "Здається, у мене депресія", "chip.psychiatry.3": "Панічні атаки — що робити?",
      "chip.relative.1": "Близька людина вживає", "chip.relative.2": "Як поговорити, не відштовхнувши?", "chip.relative.3": "Що робити родичам?",
      "chip.self.1": "Важко контролювати вживання", "chip.self.2": "Як зрозуміти, що це залежність?", "chip.self.3": "Постійна тяга і зриви",
      "greet.prefix": "Добрий день", "greet.name_prefix": "Добрий день,", "greet.intro": "Я Кіра, ІІ-психолог-аддиктолог школи доктора Шурова.",
      "greet.psychiatry.concern": "Розумію — турбує {c}. Це важко переносити наодинці, і добре, що ви вирішили поговорити. Розкажіть, що відбувається і як давно, — я допоможу розібратися.",
      "greet.psychiatry.default": "Добре, що ви вирішили поговорити про свій стан. Розкажіть, що турбує найбільше, — я допоможу.",
      "greet.addiction.concern": "Бачу, що допомога потрібна для {w}, і турбує {c}. Говорити про це непросто — тут можна чесно, без осуду. Розкажіть, що відбувається зараз.",
      "greet.addiction.default": "Говорити про це непросто — тут можна чесно, без осуду. Розкажіть, що відбувається з {w} зараз, — і я допоможу розібратися.",
      "greet.for.self": "вас", "greet.for.relative": "близької людини",
      "concern.label.alcohol": "алкоголь", "concern.label.drugs": "вживання речовин", "concern.label.both": "вживання",
      "concern.label.behavior": "залежна поведінка", "concern.label.anxiety": "тривога",
      "concern.label.depression": "пригнічений стан", "concern.label.sleep": "сон",
      "concern.label.panic": "панічні атаки", "concern.label.other": "ваш стан",
      "lead.open": "Залишити номер", "lead.title": "Залишити номер",
      "lead.hint": "Менеджер зателефонує у зручний час. Без посилань на оплату — спочатку розберемо ситуацію.",
      "lead.name": "Імʼя", "lead.phone": "Телефон", "lead.time": "Коли зручно зателефонувати",
      "lead.time.ph": "Наприклад: сьогодні після 18:00",
      "lead.consent": "Погоджуюсь, що менеджер може зателефонувати на цей номер",
      "lead.submit": "Надіслати", "lead.ok": "Дякуємо! Менеджер звʼяжеться у вказаний час.",
      "lead.err": "Не вдалося надіслати. Перевірте номер і згоду.",
      "lead.err.phone": "Вкажіть номер телефону", "lead.err.consent": "Потрібна згода на дзвінок",
      "chat.you": "Ви",
    },
    pl: {
      "meta.title": "Kira — asystent AI doktora Szurowa",
      "meta.description": "Kira to anonimowy asystent AI psychologa-addyktologa, wyszkolony przez doktora Wasilija Szurowa. Pomoc z uzależnieniami, lękiem i depresją. Anonimowo, 24/7.",
      "nav.doctor": "Lekarz", "nav.benefits": "Możliwości", "nav.pricing": "Możliwości", "nav.start": "Dobierz pomoc",
      "hero.eyebrow": "Dobór pomocy · szkoła doktora Szurowa", "hero.title": "Cześć,<br>jestem&nbsp;Kirą",
      "hero.sub": "Pomogę dobrać format pomocy — konsultację, program lub wsparcie kliniki. Anonimowo, bez oceniania, 24/7. Jak bot Telegram, ale na stronie i w kilku językach.",
      "hero.cta.start": "Dobierz pomoc", "hero.cta.pricing": "Od czego zacząć",
      "ways.eyebrow": "Od czego zacząć",
      "ways.self.title": "Mam uzależnienie", "ways.self.desc": "Razem zrozumiemy, co się dzieje, i zaplanujemy pierwszy krok.",
      "ways.relative.title": "Mój bliski zażywa", "ways.relative.desc": "Wsparcie dla rodzin i współuzależnionych.",
      "ways.psychiatry.title": "Lęk, depresja, nastrój", "ways.psychiatry.desc": "Psychiatria: pomogę znaleźć odpowiedni format pomocy.",
      "doctor.name": "Wasylij Aleksandrowicz Szurow", "doctor.role": "Psychiatra-narkolog · ponad 20 lat praktyki",
      "doctor.facts.1": "Założyciel kliniki Pierwszy Krok, ośrodków rehabilitacyjnych i Szkoły Online",
      "doctor.facts.2": "Pomógł ponad 10 000 rodzinom", "doctor.facts.3": "Twórca suplementów Bioiboro",
      "doctor.facts.4": "Założyciel fundacji charytatywnej Wybierz Życie",
      "doctor.facts.5": "Prelegent konferencji, ekspert medialny", "doctor.facts.6": "Gospodarz programu Gwiazdy na kroplówce",
      "doctor.video.eyebrow": "Wiadomość wideo", "doctor.video.cap": "Osobista wiadomość wideo od doktora Szurowa",
      "benefits.title": "Co otrzymujesz",
      "benefits.1": "Anonimowa rozmowa 24/7", "benefits.2": "Zacznij bez telefonu, bez wstydu i strachu",
      "benefits.3": "Staranna analiza Twojej sytuacji", "benefits.4": "Pomoc przy uzależnieniu i współuzależnieniu",
      "benefits.5": "Wsparcie dla rodzin", "benefits.6": "Odpowiedzi o lęku, depresji i psychiatrii",
      "benefits.7": "Podpowiem właściwy format pomocy", "benefits.8": "Skierowanie do klinik doktora Szurowa",
      "benefits.quote": "Czasem najtrudniejszy krok to nie leczenie, ale pierwsza szczera rozmowa. Kira powstała, żeby ją ułatwić.",
      "benefits.cta": "Dobierz pomoc",
      "legal.text": "Kira nie zastępuje lekarza, nie stawia diagnoz i nie świadczy usług medycznych. W nagłych przypadkach — <b>112</b> lub <b>103</b>.",
      "footer.privacy": "Polityka prywatności", "footer.terms": "Regulamin",
      "footer.consent": "Zgoda na przetwarzanie danych", "footer.refund": "Zasady płatności i zwrotów",
      "footer.legal": "Informacje prawne", "footer.contacts": "Kontakt", "footer.disclaimer": "Zastrzeżenie medyczne",
      "footer.sos": "Pomoc doraźna: <b>112</b> lub <b>103</b>", "footer.copy": "© Szkoła Online doktora Szurowa",
      "tabbar.home": "Strona główna", "tabbar.doctor": "Lekarz", "tabbar.pricing": "Możliwości", "tabbar.chat": "Czat",
      "chat.newChat": "Nowa rozmowa", "chat.quickStart": "Szybki start",
      "chat.quick.self": "Mam problem z uzależnieniem", "chat.quick.relative": "Martwię się o bliską osobę",
      "chat.quick.psychiatry": "Lęk, depresja, sen", "chat.quick.pricing": "Od czego zacząć",
      "chat.online": "Kira jest online", "chat.toSite": "Wróć do strony →",
      "chat.mode.expert": "Rozmowa", "chat.mode.school": "Znajdź pomoc",
      "chat.placeholder": "Napisz do Kiry…", "chat.note": "Kira to AI i nie zastępuje lekarza. W nagłych przypadkach — 103 lub 112.",
      "sub.badge": "Pierwszy dzień bezpłatnie", "sub.title": "Pełny dostęp do Kiry", "sub.period": "/ miesiąc",
      "sub.features.1": "Nieograniczona anonimowa rozmowa 24/7",
      "sub.features.2": "Ekspercka analiza jak u psychologa-addyktologa",
      "sub.features.3": "Wsparcie przy uzależnieniu, współuzależnieniu, lęku",
      "sub.features.4": "Dobór formatu pomocy i skierowanie do klinik Szurowa",
      "sub.cta": "Rozpocznij próbny dzień",
      "sub.legal": "Klikając, zgadzasz się z warunkami i zastrzeżeniem medycznym. Kira nie zastępuje lekarza. Nagłe przypadki — 112 / 103.",
      "ob.who.q": "Kto potrzebuje pomocy?", "ob.who.hint": "Zostanie to między nami — anonimowo i poufnie.",
      "ob.who.self": "Ja", "ob.who.relative": "Bliska osoba", "ob.who.psychiatry": "Lęk, depresja, sen",
      "ob.concern.q": "Co najbardziej niepokoi?", "ob.concern.hint": "Możesz doprecyzować w rozmowie — to tylko początek.",
      "ob.name.q": "Jak mam się do Ciebie zwracać?", "ob.name.hint": "Opcjonalnie — możesz zostawić puste.", "ob.name.ph": "Imię",
      "ob.name.go": "Rozpocznij rozmowę", "ob.skip": "Pomiń",
      "concern.alcohol": "Alkohol", "concern.drugs": "Narkotyki", "concern.both": "Oboje",
      "concern.behavior": "Gry / zachowanie", "concern.unknown": "Jeszcze nie wiem",
      "concern.anxiety": "Lęk", "concern.depression": "Depresja",
      "concern.sleep": "Problemy ze snem", "concern.panic": "Ataki paniki", "concern.other": "Inne",
      "chip.psychiatry.1": "Ciągły lęk i zły sen", "chip.psychiatry.2": "Chyba mam depresję", "chip.psychiatry.3": "Ataki paniki — co robić?",
      "chip.relative.1": "Bliska osoba zażywa", "chip.relative.2": "Jak rozmawiać, nie odpychając?", "chip.relative.3": "Co powinni robić bliscy?",
      "chip.self.1": "Trudno kontrolować używanie", "chip.self.2": "Jak rozpoznać uzależnienie?", "chip.self.3": "Ciągłe głody i nawroty",
      "greet.prefix": "Dzień dobry", "greet.name_prefix": "Dzień dobry,", "greet.intro": "Jestem Kirą, asystentem AI szkoły doktora Szurowa.",
      "greet.psychiatry.concern": "Rozumiem — niepokoi Cię {c}. To trudne nieść samemu, dobrze że postanowiłeś/-aś porozmawiać. Powiedz, co się dzieje i od jak dawna — pomogę.",
      "greet.psychiatry.default": "Cieszę się, że postanowiłeś/-aś porozmawiać o swoim stanie. Powiedz, co najbardziej niepokoi — pomogę.",
      "greet.addiction.concern": "Widzę, że {w} potrzebuje pomocy, a niepokoi {c}. To niełatwy temat — tu możesz mówić szczerze, bez oceniania. Powiedz, co teraz się dzieje.",
      "greet.addiction.default": "To niełatwy temat — tu możesz mówić szczerze, bez oceniania. Powiedz, co dzieje się z {w} — pomogę.",
      "greet.for.self": "Ciebie", "greet.for.relative": "bliskiej osoby",
      "concern.label.alcohol": "alkohol", "concern.label.drugs": "używanie substancji", "concern.label.both": "używanie",
      "concern.label.behavior": "zachowanie uzależniające", "concern.label.anxiety": "lęk",
      "concern.label.depression": "obniżony nastrój", "concern.label.sleep": "sen",
      "concern.label.panic": "ataki paniki", "concern.label.other": "Twój stan",
      "lead.open": "Zostaw numer", "lead.title": "Zostaw numer",
      "lead.hint": "Menedżer zadzwoni w dogodnym czasie. Bez linków do płatności — najpierw wyjaśnimy sytuację.",
      "lead.name": "Imię", "lead.phone": "Telefon", "lead.time": "Kiedy wygodnie zadzwonić",
      "lead.time.ph": "np. dziś po 18:00",
      "lead.consent": "Wyrażam zgodę na telefon od menedżera na ten numer",
      "lead.submit": "Wyślij", "lead.ok": "Dziękujemy! Menedżer oddzwoni w podanym czasie.",
      "lead.err": "Nie udało się wysłać. Sprawdź numer i zgodę.",
      "lead.err.phone": "Podaj numer telefonu", "lead.err.consent": "Wymagana zgoda na telefon",
      "chat.you": "Ty",
    },
    es: {
      "meta.title": "Kira — asistente IA del Dr. Shurov",
      "meta.description": "Kira es una asistente IA anónima, psicóloga-adictóloga entrenada por el Dr. Vasily Shurov. Ayuda con adicciones, ansiedad y depresión. Anónimo, 24/7.",
      "nav.doctor": "Doctor", "nav.benefits": "Funciones", "nav.pricing": "Funciones", "nav.start": "Encontrar ayuda",
      "hero.eyebrow": "Selección de ayuda · escuela del Dr. Shurov", "hero.title": "Hola,<br>soy&nbsp;Kira",
      "hero.sub": "Te ayudo a elegir el formato de ayuda — consulta, programa o apoyo de la clínica. Anónimo, sin juicios, 24/7. Como el bot de Telegram, pero en la web y en varios idiomas.",
      "hero.cta.start": "Encontrar ayuda", "hero.cta.pricing": "Por dónde empezar",
      "ways.eyebrow": "Por dónde empezar",
      "ways.self.title": "Tengo una adicción", "ways.self.desc": "Entenderemos qué pasa y planificaremos el primer paso.",
      "ways.relative.title": "Mi ser querido consume", "ways.relative.desc": "Apoyo para familias y codependientes.",
      "ways.psychiatry.title": "Ansiedad, depresión, estado", "ways.psychiatry.desc": "Psiquiatría: te ayudaré a entender y encontrar el formato de ayuda adecuado.",
      "doctor.name": "Vasily Alexandrovich Shurov", "doctor.role": "Psiquiatra-narcólogo · más de 20 años de práctica",
      "doctor.facts.1": "Fundador de la clínica Primer Paso, centros de rehabilitación y Escuela Online",
      "doctor.facts.2": "Ha ayudado a más de 10.000 familias", "doctor.facts.3": "Creador de los suplementos Bioiboro",
      "doctor.facts.4": "Fundador de la fundación benéfica Elige la Vida",
      "doctor.facts.5": "Conferenciante y experto en medios", "doctor.facts.6": "Presentador de Estrellas bajo el gotero",
      "doctor.video.eyebrow": "Mensaje en video", "doctor.video.cap": "Mensaje personal en video del Dr. Shurov",
      "benefits.title": "Qué obtienes",
      "benefits.1": "Conversación anónima 24/7", "benefits.2": "Empezar sin llamar, sin vergüenza ni miedo",
      "benefits.3": "Análisis cuidadoso de tu situación", "benefits.4": "Ayuda con adicción y codependencia",
      "benefits.5": "Apoyo para familiares", "benefits.6": "Respuestas sobre ansiedad, depresión y psiquiatría",
      "benefits.7": "Te sugeriré el formato de ayuda adecuado", "benefits.8": "Derivación a las clínicas del Dr. Shurov",
      "benefits.quote": "A veces el paso más difícil no es el tratamiento, sino la primera conversación honesta. Kira fue creada para que esa conversación sea más fácil.",
      "benefits.cta": "Encontrar ayuda",
      "legal.text": "Kira no reemplaza a un médico, no diagnostica ni presta servicios médicos. En caso de emergencia — <b>112</b> o <b>103</b>.",
      "footer.privacy": "Política de privacidad", "footer.terms": "Términos de servicio",
      "footer.consent": "Consentimiento de datos", "footer.refund": "Política de pago y devolución",
      "footer.legal": "Información legal", "footer.contacts": "Contacto", "footer.disclaimer": "Aviso médico",
      "footer.sos": "Emergencias: <b>112</b> o <b>103</b>", "footer.copy": "© Escuela Online del Dr. Shurov",
      "tabbar.home": "Inicio", "tabbar.doctor": "Doctor", "tabbar.pricing": "Funciones", "tabbar.chat": "Chat",
      "chat.newChat": "Nueva conversación", "chat.quickStart": "Inicio rápido",
      "chat.quick.self": "Tengo dificultades con la adicción", "chat.quick.relative": "Me preocupa un ser querido",
      "chat.quick.psychiatry": "Ansiedad, depresión, sueño", "chat.quick.pricing": "Por dónde empezar",
      "chat.online": "Kira está en línea", "chat.toSite": "Volver al sitio →",
      "chat.mode.expert": "Conversación", "chat.mode.school": "Encontrar ayuda",
      "chat.placeholder": "Escríbele a Kira…", "chat.note": "Kira es IA y no reemplaza a un médico. Emergencias — 103 o 112.",
      "sub.badge": "Primer día gratis", "sub.title": "Acceso completo a Kira", "sub.period": "/ mes",
      "sub.features.1": "Conversación anónima ilimitada 24/7",
      "sub.features.2": "Análisis experto como psicóloga-adictóloga",
      "sub.features.3": "Apoyo con adicción, codependencia y ansiedad",
      "sub.features.4": "Selección de formato de ayuda y derivación a clínicas",
      "sub.cta": "Iniciar día de prueba",
      "sub.legal": "Al hacer clic, aceptas los términos y el aviso médico. Kira no reemplaza a un médico. Emergencias — 112 / 103.",
      "ob.who.q": "¿Quién necesita ayuda?", "ob.who.hint": "Esto quedará entre nosotros — anónimo y confidencial.",
      "ob.who.self": "Yo", "ob.who.relative": "Un ser querido", "ob.who.psychiatry": "Ansiedad, depresión, sueño",
      "ob.concern.q": "¿Qué te preocupa más?", "ob.concern.hint": "Puedes aclarar en la conversación — esto es solo el comienzo.",
      "ob.name.q": "¿Cómo debo llamarte?", "ob.name.hint": "Opcional — puedes dejarlo en blanco.", "ob.name.ph": "Nombre",
      "ob.name.go": "Iniciar conversación", "ob.skip": "Omitir",
      "concern.alcohol": "Alcohol", "concern.drugs": "Drogas", "concern.both": "Ambos",
      "concern.behavior": "Juegos / conducta", "concern.unknown": "Aún no sé",
      "concern.anxiety": "Ansiedad", "concern.depression": "Depresión",
      "concern.sleep": "Problemas de sueño", "concern.panic": "Ataques de pánico", "concern.other": "Otro",
      "chip.psychiatry.1": "Ansiedad constante y mal sueño", "chip.psychiatry.2": "Creo que tengo depresión", "chip.psychiatry.3": "Ataques de pánico — ¿qué hacer?",
      "chip.relative.1": "Mi ser querido consume", "chip.relative.2": "¿Cómo hablar sin alejarlo?", "chip.relative.3": "¿Qué deben hacer los familiares?",
      "chip.self.1": "Difícil controlar el consumo", "chip.self.2": "¿Cómo saber si es adicción?", "chip.self.3": "Antojos constantes y recaídas",
      "greet.prefix": "Hola", "greet.name_prefix": "Hola,", "greet.intro": "Soy Kira, psicóloga-adictóloga IA de la escuela del Dr. Shurov.",
      "greet.psychiatry.concern": "Entiendo — te preocupa {c}. Es difícil cargarlo solo, y es bueno que hayas decidido hablar. Cuéntame qué pasa y desde cuándo — te ayudaré.",
      "greet.psychiatry.default": "Me alegra que hayas decidido hablar sobre cómo te sientes. Cuéntame qué te preocupa más — te ayudaré.",
      "greet.addiction.concern": "Veo que {w} necesita ayuda, y que {c} es una preocupación. No es fácil hablar de esto — aquí puedes ser honesto/a, sin juicios. Cuéntame qué está pasando ahora.",
      "greet.addiction.default": "No es fácil hablar de esto — aquí puedes ser honesto/a, sin juicios. Cuéntame qué está pasando con {w} — te ayudaré.",
      "greet.for.self": "ti", "greet.for.relative": "tu ser querido",
      "concern.label.alcohol": "el alcohol", "concern.label.drugs": "el consumo de sustancias", "concern.label.both": "el consumo",
      "concern.label.behavior": "la conducta adictiva", "concern.label.anxiety": "la ansiedad",
      "concern.label.depression": "el estado de ánimo deprimido", "concern.label.sleep": "el sueño",
      "concern.label.panic": "los ataques de pánico", "concern.label.other": "tu estado",
      "lead.open": "Dejar número", "lead.title": "Dejar número",
      "lead.hint": "Un manager llamará a una hora conveniente. Sin enlaces de pago — primero aclaramos la situación.",
      "lead.name": "Nombre", "lead.phone": "Teléfono", "lead.time": "Mejor hora para llamar",
      "lead.time.ph": "p. ej. hoy después de las 18:00",
      "lead.consent": "Acepto que un manager pueda llamar a este número",
      "lead.submit": "Enviar", "lead.ok": "¡Gracias! Un manager llamará a la hora indicada.",
      "lead.err": "No se pudo enviar. Revisa el teléfono y el consentimiento.",
      "lead.err.phone": "Indica un teléfono", "lead.err.consent": "Se requiere consentimiento para llamar",
      "chat.you": "Tú",
    },
  };

  // ─── Хранилище ───
  const LS = { device: "kira_sale_device_id", profile: "kira_sale_profile", history: "kira_sale_history", mode: "kira_sale_mode" };
  const load = (k, d) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  // ─── i18n ───
  const SUPPORTED_LANGS = ["ru", "en", "uk", "pl", "es"];
  const LANG_META = {
    ru: { flag: "🇷🇺", name: "Русский" },
    en: { flag: "🇬🇧", name: "English" },
    uk: { flag: "🇺🇦", name: "Українська" },
    pl: { flag: "🇵🇱", name: "Polski" },
    es: { flag: "🇪🇸", name: "Español" },
  };

  // Автоопределение языка при первом заходе: смотрим язык(и) браузера
  // (navigator.language/languages) — это надёжнее физической геолокации,
  // т.к. не требует разрешения и отражает реальный язык человека, а не
  // страну (турист/VPN не сломают определение). Если язык не входит в
  // список поддерживаемых — по умолчанию английский, а не русский.
  function detectLang() {
    const cands = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"]);
    for (const c of cands) {
      const short = String(c).slice(0, 2).toLowerCase();
      if (SUPPORTED_LANGS.includes(short)) return short;
    }
    return "en";
  }

  // Язык браузера на входе; ручной выбор в меню сохраняется отдельно.
  let currentLang = load("kira_sale_lang_manual", false)
    ? (load("kira_sale_lang", null) || detectLang())
    : detectLang();
  function t(key) { return (TRANSLATIONS[currentLang] || TRANSLATIONS.ru)[key] || (TRANSLATIONS.ru[key] || key); }
  function applyLang(lang, manual) {
    currentLang = lang; save("kira_sale_lang", lang);
    if (manual) save("kira_sale_lang_manual", true);
    document.documentElement.lang = lang;
    // Обновить тексты data-i18n
    $$("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n; const val = t(key);
      if (val !== undefined) el.innerHTML = val;
    });
    // Обновить placeholder
    $$("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder; const val = t(key);
      if (val !== undefined) el.placeholder = val;
    });
    // Meta title / description
    const titleEl = document.querySelector("title");
    if (titleEl) titleEl.textContent = t("meta.title");
    const descEl = document.querySelector("meta[name=description]");
    if (descEl) descEl.setAttribute("content", t("meta.description"));
    // Обновить метку и флаг в кнопке языка + активный пункт в меню
    const meta = LANG_META[lang] || LANG_META.ru;
    const flagEl = $("#langFlag"); if (flagEl) flagEl.textContent = meta.flag;
    $("#langCur").textContent = lang.toUpperCase();
    $$("#langMenu button[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    if (typeof syncLeadBtn === "function") syncLeadBtn();
    // Логотип: RU — logo_top.png, остальные языки — eng_logo.jpg
    const logoSrc = lang === "ru" ? "logo_top.png" : "eng_logo.jpg";
    $$(".brand-logo, .chat-logo").forEach((el) => { if (el.getAttribute("src") !== logoSrc) el.setAttribute("src", logoSrc); });
  }
  // Инициализировать переводы при загрузке (язык — сохранённый выбор или автоопределение)
  applyLang(currentLang);

  function deviceId() {
    let id = load(LS.device, "");
    if (!id) { id = (crypto.randomUUID && crypto.randomUUID()) || "dev-" + Math.random().toString(36).slice(2); save(LS.device, id); }
    return id;
  }
  const DEVICE = deviceId();
  const uid = () => (crypto.randomUUID && crypto.randomUUID()) || ("c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
  let profile = load(LS.profile, null);
  let mode = "school"; // Sale: только подбор

  // Мульти-чаты (как в ChatGPT)
  let chats = load("kira_sale_chats", null);
  let currentId = load("kira_sale_current", null);
  if (!Array.isArray(chats)) {
    const old = load(LS.history, []);
    chats = [];
    if (old && old.length) {
      const fu = old.find((m) => m.role === "user");
      chats.push({ id: uid(), title: fu ? fu.content.slice(0, 42) : "Разговор", mode: mode, profile: profile, messages: old, ts: Date.now() });
      currentId = chats[0].id;
    }
    save("kira_sale_chats", chats); save("kira_sale_current", currentId);
  }
  const saveChats = () => { save("kira_sale_chats", chats.slice(0, 40)); save("kira_sale_current", currentId); };
  const curChat = () => chats.find((c) => c.id === currentId) || null;
  const curMsgs = () => { const c = curChat(); return c ? c.messages : []; };

  // ─── Элементы ───
  const chatWrap = $("#chatWrap"), chatScroll = $("#chatScroll"), messagesEl = $("#messages");
  const input = $("#input"), sendBtn = $("#send"), statusDot = $("#statusDot");
  const onboarding = $("#onboarding"), obBody = $("#obBody"), obProgress = $("#obProgress");
  const subModal = $("#subModal"), chipsEl = $("#chips");
  const chatSide = $("#chatSide"), chatBackdrop = $("#chatBackdrop"), chatList = $("#chatList");
  let busy = false;

  // ─── Статус сервиса ───
  fetch(`${BACKEND}/healthz`).then((r) => r.json()).then((d) => {
    statusDot.classList.add(d.demo ? "demo" : "online");
    statusDot.title = d.demo ? "Демо-режим" : "Онлайн";
  }).catch(() => { statusDot.title = "Сервер недоступен"; });

  // ─── Оверлеи ───
  const lock = () => document.body.classList.add("locked");
  const unlock = () => { if (!chatWrap.classList.contains("open")) document.body.classList.remove("locked"); };
  function openSheet(el) { el.classList.add("open"); el.setAttribute("aria-hidden", "false"); lock(); }
  function closeSheet(el) { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); unlock(); }

  // ═══════════ ЛЕНДИНГ ═══════════
  $$("[data-topic]").forEach((b) => b.addEventListener("click", () => startOnboarding(b.dataset.topic)));
  $("#navStart").addEventListener("click", () => startOnboarding(null));
  $("#heroStart").addEventListener("click", () => startOnboarding(null));
  $("#benefitsCta").addEventListener("click", () => startOnboarding(null));

  // ─── Навигация: шапка + мобильный таб-бар ───
  const nav = $("#nav"), tabbar = $("#tabbar");
  function goSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function openChatEntry() {
    if (chats.length || profile) openChat(false);
    else startOnboarding(null);
  }
  $$(".tabbar-item").forEach((b) => b.addEventListener("click", () => {
    const go = b.dataset.go;
    $$(".tabbar-item").forEach((x) => x.classList.toggle("active", x === b));
    if (go === "top") goSection("top");
    else if (go === "doctor") goSection("doctor");
    else if (go === "benefits") goSection("benefits");
    else if (go === "chat") openChatEntry();
  }));

  // Скрытие шапки/таб-бара при скролле вниз, показ — при скролле вверх
  let lastY = window.scrollY, ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY, down = y > lastY && y > 120;
      nav.classList.toggle("hidden", down);
      tabbar.classList.toggle("hidden", down);
      lastY = y; ticking = false;
    });
  }, { passive: true });

  // Язык
  const langBtn = $("#langBtn"), langMenu = $("#langMenu");
  langBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const open = !langMenu.classList.contains("open");
    langMenu.classList.toggle("open", open);
    langBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", (e) => {
    if (!$("#lang") || $("#lang").contains(e.target)) return;
    langMenu.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  });
  $$("#langMenu button[data-lang]").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    applyLang(b.dataset.lang, true);
    langMenu.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  }));

  // Подписка в Sale не используется — CTA ведут сразу в онбординг/чат.
  function openSub() { startOnboarding(null); }

  // ═══════════ ОНБОРДИНГ (iOS-карточки) ═══════════
  const draft = {};
  let steps = [], stepIdx = 0;

  function startOnboarding(topic) {
    draft.topic = topic || null;
    draft.who = topic === "relative" ? "relative" : (topic === "self" || topic === "psychiatry" ? "self" : null);
    draft.category = topic === "psychiatry" ? "psychiatry" : (topic ? "addiction" : null);
    draft.concern = null; draft.name = "";
    steps = buildSteps(); stepIdx = 0;
    openSheet(onboarding);
    renderStep();
  }

  function buildSteps() {
    const s = [];
    if (!draft.who) s.push("who");
    s.push("concern");
    s.push("name");
    return s;
  }

  function concernOptions() {
    const cat = draft.category || (draft.who === "psychiatry" ? "psychiatry" : "addiction");
    if (cat === "psychiatry") return [
      { v: "anxiety", l: t("concern.anxiety") }, { v: "depression", l: t("concern.depression") },
      { v: "sleep", l: t("concern.sleep") }, { v: "panic", l: t("concern.panic") },
      { v: "other", l: t("concern.other") },
    ];
    return [
      { v: "alcohol", l: t("concern.alcohol") }, { v: "drugs", l: t("concern.drugs") },
      { v: "both", l: t("concern.both") }, { v: "behavior", l: t("concern.behavior") },
      { v: "unknown", l: t("concern.unknown") },
    ];
  }

  function renderStep() {
    const key = steps[stepIdx];
    obProgress.innerHTML = steps.map((_, i) => `<i class="${i <= stepIdx ? "active" : ""}"></i>`).join("");

    if (key === "who") {
      obBody.innerHTML = `
        <h3 class="ob-q">${esc(t("ob.who.q"))}</h3>
        <p class="ob-hint">${esc(t("ob.who.hint"))}</p>
        <div class="ob-options">
          ${optRow("self", t("ob.who.self"))}
          ${optRow("relative", t("ob.who.relative"))}
          ${optRow("psychiatry", t("ob.who.psychiatry"))}
        </div>
        <button class="ob-skip" id="obSkip">${esc(t("ob.skip"))}</button>`;
      obBody.querySelectorAll(".ob-opt").forEach((r) => r.addEventListener("click", () => {
        const v = r.dataset.v;
        if (v === "psychiatry") { draft.who = "self"; draft.category = "psychiatry"; }
        else { draft.who = v; draft.category = "addiction"; }
        advance();
      }));
    } else if (key === "concern") {
      obBody.innerHTML = `
        <h3 class="ob-q">${esc(t("ob.concern.q"))}</h3>
        <p class="ob-hint">${esc(t("ob.concern.hint"))}</p>
        <div class="ob-options">${concernOptions().map((o) => optRow(o.v, o.l)).join("")}</div>
        <button class="ob-skip" id="obSkip">${esc(t("ob.skip"))}</button>`;
      obBody.querySelectorAll(".ob-opt").forEach((r) => r.addEventListener("click", () => { draft.concern = r.dataset.v; advance(); }));
    } else {
      obBody.innerHTML = `
        <h3 class="ob-q">${esc(t("ob.name.q"))}</h3>
        <p class="ob-hint">${esc(t("ob.name.hint"))}</p>
        <div class="ob-field">
          <input class="ob-input" id="obName" type="text" maxlength="40" placeholder="${esc(t("ob.name.ph"))}" autocomplete="given-name" />
          <button class="ob-next" id="obGo">${esc(t("ob.name.go"))}</button>
        </div>`;
      const nm = $("#obName");
      const go = () => { draft.name = (nm.value || "").trim().slice(0, 40); finishOnboarding(); };
      $("#obGo").addEventListener("click", go);
      nm.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); go(); } });
      setTimeout(() => nm.focus(), 60);
    }
    const skip = $("#obSkip");
    if (skip) skip.addEventListener("click", advance);
  }

  const optRow = (v, l) => `<button class="ob-opt" data-v="${v}"><span>${l}</span><svg class="chev" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 6l6 6-6 6z"/></svg></button>`;

  function advance() {
    if (stepIdx < steps.length - 1) { stepIdx++; renderStep(); }
    else finishOnboarding();
  }

  function finishOnboarding() {
    profile = {
      who: draft.who || "self",
      category: draft.category || "addiction",
      concern: draft.concern || null,
      name: draft.name || "",
    };
    save(LS.profile, profile);
    closeSheet(onboarding);
    openChat(true);
  }

  $("#obClose").addEventListener("click", () => closeSheet(onboarding));

  // ═══════════ ЧАТ ═══════════
  function openChatUI() {
    chatWrap.classList.add("open");
    chatWrap.setAttribute("aria-hidden", "false");
    document.body.classList.add("chat-open");
    lock();
    fitViewport();
  }
  function closeChat() {
    chatWrap.classList.remove("open");
    chatWrap.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked", "chat-open");
    closeDrawer();
    chatWrap.style.top = "";
    chatWrap.style.height = "";
    chatWrap.style.bottom = "";
  }

  // Клавиатура iOS: чат ровно в видимой области (над клавиатурой), без щели снизу
  function fitViewport() {
    const vv = window.visualViewport;
    if (!vv || !chatWrap.classList.contains("open")) return;
    chatWrap.style.top = (vv.offsetTop || 0) + "px";
    chatWrap.style.height = vv.height + "px";
    chatWrap.style.bottom = "auto";
    if (chatScroll) chatScroll.scrollTop = chatScroll.scrollHeight;
  }
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", fitViewport);
    window.visualViewport.addEventListener("scroll", fitViewport);
  }

  function openChat(fresh) {
    openChatUI();
    if (fresh || !chats.length) { newConversation(profile); return; }
    const c = curChat() || chats[0];
    currentId = c.id; profile = c.profile || profile; mode = c.mode || mode;
    renderMessages(); setMode(mode); renderChatList(); updateChips(); input.focus();
  }

  // Новый разговор (+ приветствие). seed — частичный профиль для быстрых кнопок.
  function newConversation(seed) {
    if (seed) profile = Object.assign({ who: "self", category: "addiction", concern: null, name: (profile && profile.name) || "" }, seed);
    if (!profile) profile = { who: "self", category: "addiction", concern: null, name: "" };
    save(LS.profile, profile);
    const c = { id: uid(), title: "Новый разговор", mode: mode, profile: profile, messages: [], ts: Date.now() };
    chats.unshift(c); currentId = c.id;
    messagesEl.innerHTML = "";
    setMode(mode);
    greet();
    saveChats(); renderChatList(); updateChips(); closeDrawer();
    input.value = ""; autoGrow(); openChatUI(); input.focus();
  }

  function switchChat(id) {
    const c = chats.find((x) => x.id === id); if (!c) return;
    currentId = id; profile = c.profile || profile; mode = c.mode || mode;
    save(LS.profile, profile); save("kira_sale_current", id);
    renderMessages(); setMode(mode); renderChatList(); updateChips(); closeDrawer(); input.focus();
  }

  function deleteChat(id) {
    chats = chats.filter((c) => c.id !== id);
    if (currentId === id) currentId = chats[0] ? chats[0].id : null;
    saveChats();
    if (!chats.length) { newConversation(profile); return; }
    switchChat(currentId);
  }

  function renderMessages() {
    messagesEl.innerHTML = "";
    curMsgs().forEach((m) => addMessage(m.role === "user" ? "user" : "kira", m.content));
    stick();
  }

  function renderChatList() {
    const t = $("#chatTitle"); if (t) t.textContent = (curChat() && curChat().title) || "Кира";
    if (!chatList) return;
    chatList.innerHTML = chats.map((c) => `
      <div class="chat-item ${c.id === currentId ? "active" : ""}" data-id="${c.id}" role="button" tabindex="0">
        <span class="chat-item-t">${esc(c.title || "Разговор")}</span>
        <span class="chat-item-del" data-del="${c.id}" title="Удалить" aria-label="Удалить">✕</span>
      </div>`).join("");
    chatList.querySelectorAll(".chat-item").forEach((el) => el.addEventListener("click", (e) => {
      if (e.target.closest("[data-del]")) return; switchChat(el.dataset.id);
    }));
    chatList.querySelectorAll("[data-del]").forEach((el) => el.addEventListener("click", (e) => {
      e.stopPropagation(); deleteChat(el.dataset.del);
    }));
  }

  // ─── Шторка / сайдбар ───
  function openDrawer() { chatSide.classList.add("open"); chatBackdrop.classList.add("show"); }
  function closeDrawer() { chatSide.classList.remove("open"); chatBackdrop.classList.remove("show"); }
  $("#chatMenu").addEventListener("click", openDrawer);
  $("#chatBackdrop").addEventListener("click", closeDrawer);
  $("#sideClose").addEventListener("click", closeDrawer);
  $("#chatNew").addEventListener("click", () => newConversation(null));
  $("#chatNewTop").addEventListener("click", () => newConversation(null));
  $("#chatToSite").addEventListener("click", (e) => { e.preventDefault(); closeChat(); });

  // ─── Чипы-подсказки (только на старте, над полем ввода) ───
  function chipSet() {
    const p = profile || {};
    let keys;
    if (p.category === "psychiatry") keys = ["chip.psychiatry.1", "chip.psychiatry.2", "chip.psychiatry.3"];
    else if (p.who === "relative") keys = ["chip.relative.1", "chip.relative.2", "chip.relative.3"];
    else keys = ["chip.self.1", "chip.self.2", "chip.self.3"];
    return keys.map((k) => ({ text: t(k) }));
  }
  function updateChips() {
    const hasUser = curMsgs().some((m) => m.role === "user");
    if (hasUser) { chipsEl.style.display = "none"; chipsEl.innerHTML = ""; return; }
    chipsEl.innerHTML = chipSet().map((c) => {
      return `<button type="button" class="chip">${esc(c.text)}</button>`;
    }).join("");
    chipsEl.style.display = "flex";
    chipsEl.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => submit(c.textContent)));
  }

  // Sale: только подбор помощи (school)
  function setMode(_m) {
    mode = "school";
    const c = curChat(); if (c) { c.mode = "school"; saveChats(); }
  }

  // Персональное приветствие (UI)
  function greet() {
    const p = profile || { who: "self" };
    const hi = p.name ? `${t("greet.name_prefix")} ${p.name}.` : `${t("greet.prefix")}.`;
    const forWhom = p.who === "relative" ? t("greet.for.relative") : t("greet.for.self");
    const concernLabel = t(`concern.label.${p.concern}`);
    const c = p.concern && concernLabel !== `concern.label.${p.concern}` ? concernLabel : null;
    let body;
    if (p.category === "psychiatry") {
      body = c
        ? t("greet.psychiatry.concern").replace("{c}", c)
        : t("greet.psychiatry.default");
    } else {
      body = c
        ? t("greet.addiction.concern").replace("{w}", forWhom).replace("{c}", c)
        : t("greet.addiction.default").replace("{w}", forWhom);
    }
    addMessage("kira", `${hi} ${t("greet.intro")} ${body}`);
    curMsgs().push({ role: "assistant", content: messagesEl.lastChild.querySelector(".bubble").textContent });
    saveChats();
  }

  // Ввод
  function autoGrow() { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 168) + "px"; sendBtn.disabled = busy || !input.value.trim(); }
  input.addEventListener("input", autoGrow);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } });
  sendBtn.addEventListener("click", submit);

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /** Убрать markdown-маркеры из ответа модели (часто сыплет **, #, - ). */
  function stripMd(s) {
    return String(s || "")
      .replace(/\r\n/g, "\n")
      .replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*\n?/g, "").replace(/```/g, ""))
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/(^|\s)\*([^*\n]+)\*(?=\s|$)/g, "$1$2")
      .replace(/(^|\s)_([^_\n]+)_(?=\s|$)/g, "$1$2")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/^\s*[-*•]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1 $2")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
  function markup(raw) {
    const t = stripMd(raw);
    return esc(t).replace(/(https?:\/\/[^\s<]+)/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`)
      .split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  }
  function addMessage(role, text) {
    const wrap = document.createElement("div"); wrap.className = `msg ${role}`;
    const b = document.createElement("div"); b.className = "bubble";
    if (text) b.innerHTML = role === "user" ? `<p>${esc(text).replace(/\n/g, "<br>")}</p>` : markup(text);
    wrap.append(b); messagesEl.append(wrap); stick(); return b;
  }
  function typing() { const b = addMessage("kira", ""); b.innerHTML = '<div class="aurora"><span></span><span></span><span></span></div>'; return b; }
  function stick(force = false) {
    const el = chatScroll;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 140;
    if (force || nearBottom) el.scrollTop = el.scrollHeight;
  }

  let streamRaf = 0;
  function paintStream(bubble, text, live) {
    if (streamRaf) cancelAnimationFrame(streamRaf);
    streamRaf = requestAnimationFrame(() => {
      streamRaf = 0;
      bubble.innerHTML = markup(text) + (live ? '<span class="stream-cursor" aria-hidden="true"></span>' : "");
      stick();
    });
  }

  async function submit(prefill) {
    const text = (typeof prefill === "string" ? prefill : input.value).trim();
    if (!text || busy) return;
    if (!curChat()) newConversation(profile);
    input.value = ""; autoGrow(); setBusy(true);
    chipsEl.style.display = "none";
    addMessage("user", text);
    const msgs = curMsgs(); msgs.push({ role: "user", content: text });
    const ch = curChat(); if (ch && (!ch.title || ch.title === "Новый разговор")) ch.title = text.slice(0, 42);
    saveChats(); renderChatList();
    const bubble = typing(); let acc = "", started = false;
    try {
      const resp = await fetch(`${BACKEND}/api/chat`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: msgs,
          profile,
          mode: "school",
          deviceId: DEVICE,
          lang: currentLang,
          conversationId: currentId,
        }),
      });
      if (!resp.ok || !resp.body) throw new Error("bad");
      const reader = resp.body.getReader(), dec = new TextDecoder(); let buf = "";
      while (true) {
        const { value, done } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        const evs = buf.split("\n\n"); buf = evs.pop() || "";
        for (const block of evs) {
          const em = block.match(/^event:\s*(.+)$/m), dm = block.match(/^data:\s*(.+)$/m);
          if (!dm) continue; let data; try { data = JSON.parse(dm[1]); } catch { continue; }
          const ev = em ? em[1].trim() : "message";
          if (ev === "delta" && data.text) {
            if (!started) { bubble.innerHTML = ""; started = true; }
            acc += data.text;
            paintStream(bubble, acc, true);
          } else if (ev === "error") {
            if (streamRaf) cancelAnimationFrame(streamRaf);
            bubble.innerHTML = markup(data.message || "Что-то пошло не так. Попробуйте ещё раз.");
          } else if (ev === "done") {
            if (acc) paintStream(bubble, acc, false);
          }
        }
      }
      if (!acc) bubble.innerHTML = markup("Не удалось получить ответ. Попробуйте ещё раз чуть позже.");
      else {
        if (streamRaf) cancelAnimationFrame(streamRaf);
        bubble.innerHTML = markup(acc);
        msgs.push({ role: "assistant", content: acc }); saveChats();
      }
    } catch {
      if (streamRaf) cancelAnimationFrame(streamRaf);
      bubble.innerHTML = markup(BACKEND ? "Не удалось связаться с сервером Киры. Проверьте бэкенд и адрес в config.js." : "Не задан адрес бэкенда в config.js.");
    } finally { setBusy(false); input.focus(); }
  }
  function setBusy(v) { busy = v; sendBtn.disabled = v || !input.value.trim(); }

  // ═══════════ LEAD STUB (EU / не-ru) → позже amo ═══════════
  // Важно: syncLeadBtn вызывается из applyLang ещё до этого блока —
  // поэтому только $("#…"), без const leadOpen (иначе TDZ и мёртвый весь app.js).
  function syncLeadBtn() {
    const btn = $("#leadOpen");
    if (!btn) return;
    btn.hidden = currentLang === "ru";
  }
  syncLeadBtn();
  const leadSheet = $("#leadSheet");
  function openLead() {
    if (!leadSheet) return;
    const st = $("#leadStatus");
    if (st) { st.hidden = true; st.textContent = ""; st.className = "lead-status"; }
    if (profile && profile.name && $("#leadName") && !$("#leadName").value) $("#leadName").value = profile.name;
    openSheet(leadSheet);
  }
  const leadOpenBtn = $("#leadOpen");
  if (leadOpenBtn) leadOpenBtn.addEventListener("click", openLead);
  const leadClose = $("#leadClose");
  if (leadClose) leadClose.addEventListener("click", () => closeSheet(leadSheet));
  if (leadSheet) leadSheet.addEventListener("click", (e) => { if (e.target === leadSheet) closeSheet(leadSheet); });
  const leadSubmit = $("#leadSubmit");
  if (leadSubmit) leadSubmit.addEventListener("click", async () => {
    const phone = (($("#leadPhone") && $("#leadPhone").value) || "").trim();
    const name = (($("#leadName") && $("#leadName").value) || "").trim();
    const callTime = (($("#leadTime") && $("#leadTime").value) || "").trim();
    const consent = !!( $("#leadConsent") && $("#leadConsent").checked );
    const st = $("#leadStatus");
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      if (st) { st.hidden = false; st.className = "lead-status err"; st.textContent = t("lead.err.phone"); }
      return;
    }
    if (!consent) {
      if (st) { st.hidden = false; st.className = "lead-status err"; st.textContent = t("lead.err.consent"); }
      return;
    }
    leadSubmit.disabled = true;
    try {
      const resp = await fetch(`${BACKEND}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, callTime, consent,
          lang: currentLang,
          profile,
          deviceId: DEVICE,
          conversationId: currentId,
          notes: "",
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.message || "err");
      if (st) { st.hidden = false; st.className = "lead-status ok"; st.textContent = t("lead.ok"); }
      if (typeof addMessage === "function") {
        addMessage("kira", t("lead.ok"));
        const msgs = curMsgs();
        if (msgs) { msgs.push({ role: "assistant", content: t("lead.ok") }); saveChats(); }
      }
      setTimeout(() => closeSheet(leadSheet), 1200);
    } catch {
      if (st) { st.hidden = false; st.className = "lead-status err"; st.textContent = t("lead.err"); }
    } finally {
      leadSubmit.disabled = false;
    }
  });

  autoGrow();

  // После перезагрузки сразу вернуть в чат, если уже был профиль / диалоги
  if (chats.length || profile) {
    openChat(false);
  }
})();
