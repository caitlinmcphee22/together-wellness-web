import type { Page } from './types'

const ai = '. Artist’s impression'
const im = (name: string, alt: string, caption?: string) => ({ src: `/images/${name}.jpg`, alt, caption })

export const pages: Page[] = [
  {
    slug: 'home',
    title: 'Home',
    seoTitle: 'Together Wellness | Physiotherapy, Pilates and Wellness in Mosman Park',
    seoDescription:
      'A physiotherapist-led studio for physiotherapy, reformer and clinical Pilates, and wellness at Mos Lane, Mosman Park, Western Australia.',
    hero: im('reformer-studio-wide', 'Reformer studio at Together Wellness, Mosman Park'),
    blocks: [
      {
        _type: 'statement',
        spacing: 'large',
        text: 'Together Wellness is a new destination for movement, health and wellbeing, with our first studio in Mosman Park.',
      },
      {
        _type: 'tile',
        image: im('frontage', 'Street frontage of the Together Wellness studio'),
        caption: 'Together Wellness, Mosman Park',
        description: 'Our first studio, at Mos Lane, Mosman Park.',
        link: '/our-space',
        width: 'xl',
        aspect: '16 / 9',
      },
      {
        _type: 'statement',
        text: 'Bringing together expert physiotherapy, considered Pilates and a more personal approach to wellbeing, Together Wellness is a space designed to support the way we move, feel and live.',
      },
      { _type: 'sectionIntro', heading: 'Movement. Care. Connection.', subheading: 'A considered approach to feeling well.' },
      {
        _type: 'tile',
        image: im('reformer-studio', 'Reformer Pilates studio with reformers and equipment wall'),
        caption: 'Pilates',
        // AHPRA: outcome claims ("build strength, improve mobility") replaced with process language
        description:
          'Movement with purpose. From dynamic reformer classes to personalised clinical Pilates, every session is programmed by physiotherapists and adapted to the person doing it.',
        link: '/pilates',
        width: 'l',
        aspect: '1492 / 1054',
      },
      {
        _type: 'tile',
        image: im('treatment-rooms', 'Physiotherapy treatment rooms'),
        caption: 'Physiotherapy',
        // AHPRA: outcome claims ("support recovery, restore movement") replaced with process language
        description:
          'Expert care, centred around you. A thorough assessment, a plan you understand and care that fits each stage of life.',
        link: '/physiotherapy',
        width: 'xl',
        aspect: '1492 / 1054',
      },
      {
        _type: 'tile',
        image: im('lounge', 'Lounge with armchairs and artwork'),
        caption: 'Wellness',
        description: 'More than a place to exercise. A welcoming space to slow down, reconnect and invest in yourself.',
        link: '/wellness',
        width: 's',
        aspect: '4 / 5',
      },
      {
        _type: 'statement',
        text: 'Rooted in the belief that feeling well is about more than physical health, our approach brings together purposeful movement, personalised care and meaningful connection.',
      },
      {
        _type: 'sectionIntro',
        heading: 'A new space for wellbeing.',
        body: 'Inspired by the natural warmth and relaxed rhythm of coastal Western Australia, our space has been thoughtfully designed to balance movement with moments of pause.',
      },
      {
        _type: 'tile',
        image: im('reception-lounge', 'Reception lounge with timber joinery and a planted pot'),
        caption: 'Reception, Mosman Park',
        description: 'Natural materials, warm textures and considered details.',
        link: '/our-space',
        width: 'm',
        aspect: '1492 / 1054',
      },
      {
        _type: 'tile',
        image: im('clinical-studio', 'Clinical Pilates studio with trapeze table and chair'),
        caption: 'Clinical Pilates Studio, Mosman Park',
        description: 'A dedicated studio for clinical Pilates, with up to four people and one physiotherapist.',
        link: '/pilates',
        width: 'xl',
        aspect: '1632 / 1152',
      },
      {
        _type: 'statement',
        text: 'A place where the experience of arriving, moving and spending time matters just as much as the care you receive.',
      },
      {
        _type: 'tile',
        image: im('reception-desk', 'Reception desk with timber shelving'),
        caption: 'Arrival, Mosman Park',
        description: 'Arrive, settle in and take a moment before you move.',
        link: '/our-space',
        width: 's',
        aspect: '4 / 5',
      },
      {
        _type: 'tile',
        image: im('amenities', 'Stone basin and timber bench'),
        caption: 'Studio Amenities, Mosman Park',
        link: '/our-space',
        width: 'l',
        aspect: '1492 / 1054',
      },
      {
        _type: 'statement',
        spacing: 'large',
        text: 'Thoughtfully designed to balance movement and moments of pause, our studio offers a welcoming environment to move with intention, reconnect with yourself and feel part of something.',
        label: 'A considered approach to feeling well. Together.',
      },
      { _type: 'exploreServices' },
    ],
  },
  {
    slug: 'about',
    title: 'About',
    seoDescription:
      'Together Wellness is a physiotherapist-led studio in Mosman Park bringing physiotherapy, Pilates and wellbeing together under one roof.',
    hero: im('frontage', 'Street frontage of the Together Wellness studio'),
    blocks: [
      {
        _type: 'splitTitle',
        eyebrow: 'About',
        title: 'Whole of body. Whole of life.',
        image: im('reception-desk', 'Reception desk with timber shelving', 'Reception' + ai),
      },
      {
        _type: 'statement',
        text: 'Rooted in the belief that feeling well is about more than physical health, our approach brings together purposeful movement, personalised care and meaningful connection.',
      },
      {
        _type: 'split',
        heading: 'Overview',
        layout: 'stack',
        paragraphs: [
          'Together Wellness is a new destination for movement, health and wellbeing, with our first studio in Mosman Park.',
          'We bring together expert physiotherapy, considered Pilates and a more personal approach to wellbeing, in a space designed around the way we move, feel and live.',
        ],
        link: { label: 'Explore our space', href: '/our-space' },
        slides: [im('reception-lounge', 'Reception lounge with timber joinery and a planted pot', 'Reception' + ai)],
      },
      {
        _type: 'split',
        heading: 'Our approach',
        layout: 'stack',
        paragraphs: [
          'The body is an integrated system, and each stage of life asks something different of it. Our care is built around the whole person and the stage they are in.',
          'We favour active care, and every session includes education, so you understand what is happening and how to look after yourself between visits.',
        ],
        slides: [im('hands-knee', 'Hands resting on a knee, black and white', 'Whole of body')],
      },
      {
        _type: 'split',
        heading: 'Physiotherapist-led',
        layout: 'stack',
        paragraphs: [
          'Our physiotherapists assess and treat, program our classes, and train every reformer instructor through more than 80 hours of theory, practical assessment and mentored teaching.',
        ],
        link: { label: 'Explore Pilates', href: '/pilates' },
        slides: [im('clinical-studio', 'Clinical Pilates studio with trapeze table and chair', 'Clinical Pilates studio' + ai)],
      },
      {
        _type: 'split',
        heading: 'Commitments',
        layout: 'cards',
        pinned: true,
        paragraphs: [
          'How we work matters as much as what we offer. These commitments shape the studio, the team and the way we show up in our community.',
        ],
        slides: [
          im('water-soft', 'Soft-focus water', 'Working towards B Corp certification'),
          im('amenities', 'Stone basin and timber bench', 'Sustainability'),
          im('hands-reaching', 'Two hands reaching towards each other', 'Community'),
          im('open-hand', 'Open hand, black and white', 'Education'),
        ],
      },
      {
        _type: 'team',
        heading: 'People',
        paragraphs: [
          'Physiotherapists, Pilates instructors and studio staff who share one way of working: care that is personal, evidence-informed and grounded in everyday life.',
        ],
        note: 'Select a portrait to read more.',
      },
      { _type: 'exploreServices' },
    ],
  },
  {
    slug: 'our-space',
    title: 'Our Space',
    seoDescription:
      'The Together Wellness studio at Mos Lane, Mosman Park: a reformer studio, a clinical Pilates studio, treatment rooms and a lounge, designed with Pattern Studio.',
    hero: im('reception-lounge', 'Reception lounge at Together Wellness'),
    blocks: [
      {
        _type: 'splitTitle',
        eyebrow: 'Our Space',
        title: 'A new space for wellbeing.',
        image: im('reformer-studio-wide', 'Reformer studio at Together Wellness', 'Reformer studio' + ai),
      },
      {
        _type: 'statement',
        text: 'Inspired by the natural warmth and relaxed rhythm of coastal Western Australia, our space has been thoughtfully designed to balance movement with moments of pause.',
      },
      {
        _type: 'split',
        heading: 'Vision',
        paragraphs: [
          'Natural materials, warm textures and considered details create an environment that feels as welcoming as it is restorative.',
          'A place where the experience of arriving, moving and spending time matters just as much as the care you receive.',
        ],
        slides: [
          im('reception-lounge', 'Reception lounge with timber joinery and a planted pot', 'Reception' + ai),
          im('lounge-seating', 'Lounge with armchairs and artwork', 'Lounge' + ai),
          im('arrival', 'Reception desk with timber shelving', 'Arrival' + ai),
        ],
      },
      {
        _type: 'split',
        heading: 'Design',
        paragraphs: [
          'The studio has been designed with Pattern Studio. Timber joinery, textured walls and soft, warm light carry through every room, from the reception desk to the treatment rooms.',
          'Each space has been planned around how people move through a visit: arriving, changing, moving and taking a moment before heading back into the day.',
        ],
        slides: [
          im('reception-desk', 'Reception desk with timber shelving', 'Reception desk' + ai),
          im('amenities', 'Stone basin and timber bench', 'Amenities' + ai),
          im('cork-blocks', 'Stacked cork blocks', 'Material detail'),
        ],
      },
      {
        _type: 'split',
        heading: 'Reformer studio',
        paragraphs: [
          'A light-filled studio for Group Reformer, Strength, and Ante and Postnatal classes, with room for up to 12 people per class.',
        ],
        link: { label: 'Explore Pilates', href: '/pilates' },
        slides: [
          im('reformer-studio', 'Reformer studio with equipment wall', 'Reformer studio' + ai),
          im('reformer-row', 'Row of reformers', 'Reformer studio' + ai),
        ],
      },
      {
        _type: 'split',
        heading: 'Clinical Pilates studio',
        paragraphs: [
          'A separate studio for clinical Pilates, set up for small groups of up to four people working with one physiotherapist.',
        ],
        slides: [
          im('clinical-studio', 'Clinical Pilates studio with trapeze table and chair', 'Clinical Pilates studio' + ai),
          im('clinical-trapeze', 'Trapeze table in front of a timber screen', 'Clinical Pilates studio' + ai),
        ],
      },
      {
        _type: 'split',
        heading: 'Treatment rooms',
        paragraphs: [
          'Private rooms for physiotherapy appointments, a short walk from the studios, so moving between treatment and classes is simple.',
        ],
        link: { label: 'Explore Physiotherapy', href: '/physiotherapy' },
        slides: [im('treatment-rooms', 'Physiotherapy treatment rooms', 'Treatment rooms' + ai)],
      },
      {
        _type: 'split',
        heading: 'Lounge',
        paragraphs: [
          'More than a place to exercise. A lounge to arrive early, stay a while after class, or simply sit for a moment before the rest of your day.',
        ],
        link: { label: 'Explore Wellness', href: '/wellness' },
        slides: [
          im('lounge', 'Lounge with armchairs and artwork', 'Lounge' + ai),
          im('lounge-seating', 'Lounge seating', 'Lounge' + ai),
        ],
      },
      {
        _type: 'split',
        heading: 'Location',
        paragraphs: ['Our first studio is at Mos Lane, Mosman Park, between the river and the coast.'],
        slides: [im('frontage', 'Street frontage of the Together Wellness studio', 'Mos Lane frontage' + ai)],
      },
      { _type: 'exploreServices' },
    ],
  },
  {
    slug: 'pilates',
    title: 'Pilates',
    seoDescription:
      'Group Reformer, Strength, Ante and Postnatal, and Clinical Pilates at Mos Lane, Mosman Park, programmed by physiotherapists.',
    hero: im('reformer-studio', 'Reformer Pilates studio at Together Wellness'),
    blocks: [
      {
        _type: 'pageTitle',
        eyebrow: 'Services / Pilates',
        title: 'Pilates',
        quote: 'Movement with purpose.',
        intro: 'Group Reformer, Strength, Ante and Postnatal, and Clinical Pilates at Mos Lane, Mosman Park.',
      },
      { _type: 'fullImage', image: im('reformer-studio-wide', 'Reformer studio at Together Wellness'), caption: 'Reformer Studio, Mosman Park', aspect: '16 / 8' },
      {
        _type: 'statement',
        text: 'From dynamic reformer classes to personalised clinical Pilates, every session is shaped by physiotherapists: how classes are programmed, how instructors are trained, and how each exercise is adapted to the person doing it.',
      },
      {
        _type: 'cardGrid',
        label: 'Classes and sessions',
        columns: 4,
        items: [
          { title: 'Group Reformer', body: 'Full-body reformer classes. Each class opens with a warm-up, builds through a main session with one clear focus, and closes with individual stretching.', meta: '60 minutes. Up to 12 people.' },
          { title: 'Strength', body: 'Reformer classes with more emphasis on load and progression, for people who want to train strength in a supported setting.', meta: '60 minutes. Up to 12 people.' },
          { title: 'Ante and Postnatal', body: 'Reformer classes for pregnancy and the months after birth, programmed around each stage and taught by a physiotherapist.', meta: 'Taught by a physiotherapist.' },
          { title: 'Clinical Pilates', body: 'Up to four people with one physiotherapist. Each person works through their own program, set after an initial physiotherapy assessment.', meta: '60 minutes. Up to 4 people. Private health rebates available.' },
        ],
      },
      {
        _type: 'imagePair',
        left: { ...im('clinical-trapeze', 'Clinical Pilates studio with trapeze table', 'Clinical Pilates Studio'), description: 'Each person on their own program, with a physiotherapist in the room.' },
        right: im('cork-blocks', 'Stacked cork blocks'),
      },
      {
        _type: 'numbered',
        heading: 'How we teach',
        items: [
          { title: 'Trained to our standard', body: 'Every group reformer instructor completes the Together Wellness Pilates Training Program before leading a class: more than 80 hours of theory, practical assessment and mentored teaching, taught by physiotherapists.' },
          { title: 'A check-in before every class', body: 'Your instructor asks how your body is feeling and about any new or ongoing injuries. If something needs a closer look, we can book you in with a physiotherapist on the spot.' },
          { title: 'Adapted to you', body: 'Exercises are chosen with clinical reasoning and adapted to the person doing them. There is no single correct way to move, and we don’t teach as if there were.' },
          { title: 'Explained as we go', body: 'We tell you why each exercise is in the class, how to modify it and how to carry it into the rest of your week.' },
        ],
      },
      {
        _type: 'tile',
        image: im('reformer-row', 'Row of reformers in the studio'),
        caption: 'Reformer Studio, Mosman Park',
        description: 'Find a class on the timetable.',
        link: '/book-now#timetable',
        width: 's',
        aspect: '797 / 1600',
      },
      { _type: 'exploreServices' },
    ],
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy',
    seoDescription:
      'Musculoskeletal, pelvic health, pregnancy and postnatal, and sports physiotherapy at Mos Lane, Mosman Park. 60-minute initial consultations.',
    hero: im('treatment-rooms', 'Physiotherapy treatment rooms at Together Wellness'),
    blocks: [
      {
        _type: 'pageTitle',
        eyebrow: 'Services / Physiotherapy',
        title: 'Physiotherapy',
        quote: 'Expert care, centred around you.',
        intro: 'Musculoskeletal, pelvic health, pregnancy and postnatal, and sports physiotherapy at Mos Lane, Mosman Park.',
      },
      { _type: 'fullImage', image: im('hands-knee', 'Hands resting on a knee, black and white'), caption: 'Whole of body', aspect: '16 / 8' },
      {
        _type: 'statement',
        text: 'Our physiotherapists look at the whole picture: how you move, how you live and what you want to get back to. Your first appointment runs for a full hour, so there is time to do that properly.',
      },
      {
        _type: 'cardGrid',
        label: 'What we see',
        columns: 4,
        items: [
          { title: 'Musculoskeletal', body: 'Assessment and treatment for back, neck, shoulder, hip, knee and other joint and muscle concerns, including persistent pain.' },
          { title: 'Pelvic Health', body: 'Assessment and care for pelvic floor concerns, including bladder leakage, heaviness and pelvic pain, at any stage of life.' },
          { title: 'Pregnancy and Postnatal', body: 'Support through each trimester and the months after birth, including postnatal assessment and planning a return to exercise.' },
          { title: 'Sport', body: 'Injury assessment, rehabilitation and return-to-sport planning for recreational and club athletes.' },
        ],
      },
      {
        _type: 'imagePair',
        left: im('hands-knee', 'Hands resting on a knee, black and white'),
        right: im('open-hand', 'Open hand, black and white'),
      },
      {
        _type: 'numbered',
        heading: 'What to expect',
        items: [
          { title: 'Assessment', body: 'A 60-minute initial consultation covering your history, how you move, and what matters to you day to day.' },
          { title: 'A plan you understand', body: 'You leave with a clear plan, including exercises and an explanation of what we found and why we are recommending each step.' },
          { title: 'Active care', body: 'Hands-on treatment where it is useful, with a focus on movement and exercise you can keep doing between appointments.' },
          { title: 'One team, one building', body: 'Where it suits your plan, you can move into clinical Pilates or reformer classes down the hall, with the same team keeping track.' },
        ],
      },
      {
        _type: 'appointments',
        label: 'Appointments',
        items: [
          { title: 'Initial Consultation', meta: '60 minutes' },
          { title: 'Follow-Up', meta: '30 to 45 minutes' },
        ],
        cta: { label: 'Book an appointment', href: '/book-now#timetable' },
        note: 'Private health rebates are available, depending on your fund and level of cover.',
      },
      {
        _type: 'tile',
        image: im('hands-reaching', 'Two hands reaching towards each other'),
        caption: 'Book an Initial Consultation',
        description: 'Not sure where to start? Book an initial consultation and we will plan from there.',
        link: '/book-now',
        width: 'l',
        aspect: '1520 / 950',
      },
      { _type: 'exploreServices' },
    ],
  },
  {
    slug: 'wellness',
    title: 'Wellness',
    seoDescription:
      'The studio lounge, physiotherapist-led workshops, community classes, and programs for schools, sporting clubs and workplaces.',
    hero: im('lounge', 'Lounge at Together Wellness'),
    blocks: [
      {
        _type: 'pageTitle',
        eyebrow: 'Services / Wellness',
        title: 'Wellness',
        quote: 'More than a place to exercise.',
        intro: 'The space, workshops, community, and programs for schools, clubs and workplaces.',
      },
      { _type: 'fullImage', image: im('reception-lounge', 'Reception lounge with timber joinery'), caption: 'Reception, Mosman Park', aspect: '16 / 8' },
      {
        _type: 'statement',
        text: 'A welcoming space to slow down, reconnect and invest in yourself. Where movement, care and community become a natural part of everyday life.',
      },
      {
        _type: 'tileWithText',
        tile: { ...im('arrival', 'Reception desk with timber shelving', 'Arrival, Mosman Park'), description: 'Arrive, settle in and take a moment before you move.' },
        heading: 'A new space for wellbeing.',
        paragraphs: [
          'Inspired by the natural warmth and relaxed rhythm of coastal Western Australia, our space has been thoughtfully designed to balance movement with moments of pause.',
          'Natural materials, warm textures and considered details create an environment that feels as welcoming as it is restorative. A place where the experience of arriving, moving and spending time matters just as much as the care you receive.',
        ],
        image: im('water', 'Water, close up'),
      },
      {
        _type: 'cardGrid',
        label: 'In the studio',
        columns: 3,
        items: [
          { title: 'Workshops', body: 'Small-group education sessions led by our physiotherapists, on topics like preparing your body for birth and planning the first weeks at home. Partners and family are welcome.' },
          { title: 'Community', body: 'Classes, groups and gatherings that bring people together around movement, from postnatal classes where babies are welcome to events in the studio.' },
          { title: 'A Place to Pause', body: 'A lounge to arrive early, stay a while after class, or simply sit for a moment before the rest of your day.' },
        ],
      },
      { _type: 'tile', image: im('ceramic-stones', 'Stacked ceramic stones'), width: 's', aspect: '1206 / 1464' },
      {
        _type: 'cardGrid',
        style: 'ruled',
        heading: 'Beyond the studio',
        intro: 'Physiotherapy-led programs for the places people learn, play and work, arranged directly with each school, club or workplace.',
        columns: 3,
        items: [
          { title: 'Schools', body: 'Pelvic health and movement education for Years 7 to 12, covering growing bodies, the menstrual cycle, injury prevention in sport and how to navigate healthcare.' },
          { title: 'Sporting Clubs', body: 'Pre-season screening, education for players and coaches, and injury management through the season.' },
          { title: 'Workplaces', body: 'Workplace movement assessments and programs for teams, run on site or at the studio.' },
        ],
        cta: { label: 'Enquire about a program', href: 'mailto:info@togetherwellness.com.au' },
      },
      { _type: 'exploreServices' },
    ],
  },
  {
    slug: 'book-now',
    title: 'Book Now',
    seoDescription:
      'Book physiotherapy, clinical Pilates or reformer classes at Together Wellness, Mosman Park.',
    hero: im('clinical-studio', 'Clinical Pilates studio at Together Wellness'),
    blocks: [
      {
        _type: 'pageTitle',
        eyebrow: 'Book Now',
        title: 'Book Now',
        quote: 'Whole of body. Whole of life.',
        intro:
          'Choose how you would like to start. If you are new to physiotherapy or clinical Pilates with us, begin with an initial consultation so we can understand what is going on and plan from there.',
      },
      {
        _type: 'bookingOptions',
        items: [
          {
            image: im('treatment-rooms', 'Physiotherapy treatment rooms'),
            caption: 'Physiotherapy',
            description: 'Musculoskeletal, pelvic health, pregnancy and postnatal, and sport.',
            body: 'A 60-minute initial consultation, followed by 30 to 45-minute follow-up appointments. Private health rebates are available.',
            cta: { label: 'Book an appointment', href: '#timetable' },
          },
          {
            image: im('clinical-trapeze', 'Clinical Pilates studio'),
            caption: 'Clinical Pilates',
            description: 'Up to four people with one physiotherapist.',
            body: '60-minute sessions. An initial physiotherapy assessment is needed before your first session, so we can set your program. Private health rebates are available.',
            cta: { label: 'Book an assessment', href: '#timetable' },
          },
          {
            image: im('reformer-studio', 'Reformer Pilates studio'),
            caption: 'Reformer Classes',
            description: 'Group Reformer, Strength, and Ante and Postnatal classes.',
            body: '60-minute classes for up to 12 people, taught by instructors trained in our physiotherapist-led program.',
            cta: { label: 'Find a class', href: '#timetable' },
          },
        ],
      },
      { _type: 'timetable', heading: 'Timetable' },
      { _type: 'contactPrompt', heading: 'Not sure where to start?', body: 'Call or email the studio and we will help you choose.' },
    ],
  },
]
